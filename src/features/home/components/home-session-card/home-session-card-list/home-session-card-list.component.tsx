import { list } from 'radash';
import { useCallback, useMemo } from 'react';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import Animated, { SharedValue } from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet } from 'react-native';

import COLORS from '@/constants/COLORS';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID, IS_IOS } from '@/constants/PLATFORM';
import { SessionCollectionItem } from '@/api/generated/model';
import { HEADER_HEIGHT } from '@/components/ui/header/components/header.component';

import HomeSessionCard from '../home-session-card.component';
import HomeSessionCardSkeleton from '../home-session-card-skeleton.component';
import HomeSessionCardListEmpty from './home-session-card-list-empty.component';
import HomeSessionCardListHeader from './home-session-card-list-header.component';
import HomeSessionCardListFooter from './home-session-card-list-footer.component';
import { useGetAllSessionsByFilter } from '../../../queries/get-sessions-by-filter.query';

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

type SkeletonItem = { type: 'skeleton'; uid: string };
type ListItem = SessionCollectionItem | SkeletonItem;

const AnimatedFlashList = Animated.createAnimatedComponent<FlashListProps<ListItem>>(FlashList);

const SKELETON_COUNT = 3;
const SKELETON_DATA: SkeletonItem[] = list(SKELETON_COUNT).map((_, i) => ({
  type: 'skeleton',
  uid: `skel-${i}`,
}));

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

  const { bottomTab, top } = useSafeArea();
  const listPaddingTop = top + HEADER_HEIGHT;
  const isLoadingSessions = isLoading || isRefetching;
  const isShowingRefreshControl = IS_IOS && isLoading && !isRefetching;
  const showSkeletons = isLoading;

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

  const renderItem = useCallback(({ item }) => {
    if ('type' in item && item.type === 'skeleton') {
      return <HomeSessionCardSkeleton />;
    }
    return <HomeSessionCard session={item as SessionCollectionItem} />;
  }, []);

  const getItemType = useCallback(
    (item: ListItem) => ('type' in item && item.type === 'skeleton' ? 'skeleton' : 'row'),
    [],
  );

  const dataToRender = useMemo(() => (showSkeletons ? SKELETON_DATA : sessions), [showSkeletons, sessions]);

  const keyExtractor = useCallback((item: ListItem) => {
    if ('type' in item && item.type === 'skeleton') {
      return item.uid;
    }
    return item.uid.toString();
  }, []);

  return (
    <AnimatedFlashList
      data={dataToRender}
      renderItem={renderItem}
      getItemType={getItemType}
      keyExtractor={keyExtractor}
      ListEmptyComponent={<HomeSessionCardListEmpty />}
      contentContainerStyle={{ marginTop: listPaddingTop, paddingBottom: bottomTab + listPaddingTop }}
      contentContainerClassName="bg-background rounded-t-2xl"
      style={styles.listShadow}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={<HomeSessionCardListHeader scrollY={scrollY} isFetching={isShowingRefreshControl} />}
      ListFooterComponent={<HomeSessionCardListFooter isFetchingNextPage={isFetchingNextPage} />}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      onScrollEndDrag={onScrollEndDrag}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.7}
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
    />
  );
}
