import { ListAnimated } from '@ludo/ui';
import { useSharedValue } from 'react-native-reanimated';
import { RefreshControl, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

import { useGetAllSessionsByFilter } from '../../../queries/get-sessions-by-filter.query';
import HomeSessionListItem from './home-session-list-item/home-session-list-item.component';
import HomeSessionListHeader from './home-session-list-headers/home-session-list-header.component';
import HomeSessionListItemSkeleton from './home-session-list-item/home-session-list-item-skeleton.component';
import HomeSessionListHeaderSticky from './home-session-list-headers/home-session-list-header-sticky.component';
import HomeSessionListHeaderTopList from './home-session-list-headers/home-session-list-header-top-list.component';

export default function HomeSessionList() {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
    items: sessions,
    refetch,
  } = useGetAllSessionsByFilter();

  const scrollY = useSharedValue(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  return (
    <ListAnimated
      items={sessions}
      ItemComponent={HomeSessionListItem}
      fetchNextPage={fetchNextPage}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      SkeletonComponent={HomeSessionListItemSkeleton}
      contentContainerClassName="rounded-t-2xl"
      HeaderComponent={HomeSessionListHeaderTopList}
      TopListElementComponent={<HomeSessionListHeader />}
      StickyElementComponent={<HomeSessionListHeaderSticky scrollY={scrollY} />}
      refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      bounces={false}
      onScroll={handleScroll}
    />
  );
}
