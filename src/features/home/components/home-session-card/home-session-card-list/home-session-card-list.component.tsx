import { list } from 'radash';
import { useCallback, useMemo } from 'react';
import { FlashList, FlashListProps } from '@shopify/flash-list';
import Animated, { SharedValue } from 'react-native-reanimated';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet } from 'react-native';

import { IS_IOS } from '@/constants/PLATFORM';
import { ListAnimated } from '@/components/ludo-ui';
import { useSafeArea } from '@/hooks/safe-area.hook';
import { SessionCollectionItem } from '@/api/generated/model';
import { HEADER_HEIGHT } from '@/components/ui/header/components/header.component';

import { useGetAllSessionsByFilter } from '../../../queries/get-sessions-by-filter.query';
import HomeSessionListItem from './home-session-list-item/home-session-list-item.component';
import HomeSessionCardListHeader from './home-session-card-list-headers/home-session-card-list-header.component';
import HomeSessionCardSkeleton from '../home-session-list/home-session-list-item/home-session-list-item-skeleton.component';
import HomeSessionCardListHeaderSticky from './home-session-card-list-headers/home-session-card-list-header-sticky.component';
import { HomeSessionCardListHeaderTopList } from './home-session-card-list-headers/home-session-card-list-header-top-list.component';

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
    <ListAnimated
      items={sessions}
      ItemComponent={HomeSessionListItem}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      SkeletonComponent={HomeSessionCardSkeleton}
      contentContainerClassName="rounded-t-2xl"
      onScroll={scrollHandler}
      HeaderComponent={HomeSessionCardListHeaderTopList}
      TopListElementComponent={<HomeSessionCardListHeader scrollY={scrollY} isFetching={isShowingRefreshControl} />}
      StickyElementComponent={HomeSessionCardListHeaderSticky}
    />
  );
}
