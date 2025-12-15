import { list } from 'radash';
import { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import Animated, { SharedValue } from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet } from 'react-native';

import COLORS from '@/constants/COLORS';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID, IS_IOS } from '@/constants/PLATFORM';
import { SessionCollectionSuggestionItem } from '@/api/generated/model';
import { HEADER_HEIGHT } from '@/components/ui/header/components/header.component';

import HomeSessionCard from '../home-session-card.component';
import HomeSessionCardSkeleton from '../home-session-card-skeleton.component';
import HomeSessionCardListEmpty from './home-session-card-list-empty.component';
import HomeSessionCardListHeader from './home-session-card-list-header.component';
import HomeSessionCardListFooter from './home-session-card-list-footer.component';
import { useGetAllSessionsByFilter } from '../../../queries/useGetAllSessionsByFilter.query';

interface HomeSessionCardListProps {
  scrollY?: SharedValue<number>;
}
const styles = StyleSheet.create({
  listShadow: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { height: -2, width: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
const AnimatedFlashList =
  Animated.createAnimatedComponent<React.ComponentProps<typeof FlashList<SessionCollectionSuggestionItem>>>(FlashList);

export default function HomeSessionCardList({ scrollY }: HomeSessionCardListProps) {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: sessions,
    refetch,
  } = useGetAllSessionsByFilter();

  const { top } = useSafeArea();

  const listPaddingTop = top + HEADER_HEIGHT;

  const isLoadingSessions = isLoading || isRefetching;

  const isShowingRefreshControl = IS_IOS && isLoadingSessions;

  const scrollHandler = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollYRef = scrollY;
      if (scrollYRef) {
        scrollYRef.value = event.nativeEvent.contentOffset.y;
      }
    },
    [scrollY],
  );

  const onEndReached = useCallback(() => {
    if (!isLoadingSessions && hasNextPage) {
      fetchNextPage();
    }
  }, [isLoadingSessions, hasNextPage, fetchNextPage]);

  const onScrollEndDrag = IS_IOS
    ? () => {
        if (scrollY && scrollY.value < -50) {
          refetch();
        }
      }
    : undefined;

  return (
    <AnimatedFlashList
      keyExtractor={(session, index) => (isLoadingSessions ? `skeleton-${index}` : session?.uid?.toString())}
      data={isLoadingSessions ? list(5) : sessions}
      renderItem={({ item: session }) =>
        isLoadingSessions ? <HomeSessionCardSkeleton /> : <HomeSessionCard session={session} />
      }
      ListEmptyComponent={<HomeSessionCardListEmpty />}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      contentContainerStyle={{ marginTop: listPaddingTop }}
      contentContainerClassName="bg-background rounded-t-2xl flex-grow"
      ListHeaderComponent={<HomeSessionCardListHeader scrollY={scrollY} isFetching={isShowingRefreshControl} />}
      onScrollEndDrag={onScrollEndDrag}
      showsVerticalScrollIndicator={false}
      style={styles.listShadow}
      ListFooterComponent={<HomeSessionCardListFooter isFetchingNextPage={isFetchingNextPage} />}
      onEndReached={onEndReached}
      refreshControl={
        IS_ANDROID && (
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[COLORS.primary]}
            progressViewOffset={top}
          />
        )
      }
      onEndReachedThreshold={0.5}
    />
  );
}
