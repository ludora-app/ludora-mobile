import { List } from '@ludo/ui';
import { LegendListRef } from '@legendapp/list';
import { SharedValue } from 'react-native-reanimated';
import { useCallback, useEffect, useRef } from 'react';

import { useSafeArea } from '@/hooks/safe-area.hook';

import { useChatStore } from '../store/chat.store';
import { useGetAllChatRoomsByFilter } from '../queries/get-chatrooms-by-filter.query';
import ChatConversationsListItem from './chat-conversations-list-item/chat-conversations-list-item.component';
import ChatConversationsListItemSkeleton from './chat-conversations-list-item/chat-conversations-list-item-skeleton.component';

type ChatConversationsListProps = {
  scrollY: SharedValue<number>;
};

const ITEM_HEIGHT = 81;

const SCROLL_TO_TOP_THRESHOLD = ITEM_HEIGHT * 2;

export default function ChatConversationsList({ scrollY }: ChatConversationsListProps) {
  const { bottomTab } = useSafeArea();
  const chatRoomsFilters = useChatStore(state => state.filters);
  const setScrollToTop = useChatStore(state => state.setScrollToTop);
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetAllChatRoomsByFilter(chatRoomsFilters);

  const scrollYRef = scrollY;
  const listRef = useRef<LegendListRef>(null);

  const scrollToTop = useCallback(() => {
    if (scrollYRef.value <= SCROLL_TO_TOP_THRESHOLD) {
      listRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  }, [scrollYRef]);

  useEffect(() => {
    setScrollToTop(scrollToTop);
    return () => setScrollToTop(null);
  }, [scrollToTop, setScrollToTop]);



  return (
    <List
      key={chatRoomsFilters.type ?? 'all'}
      data={items}
      listRef={listRef}
      ItemComponent={ChatConversationsListItem}
      SkeletonComponent={ChatConversationsListItemSkeleton}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isLoading={isLoading}
      isRefetching={isRefetching}
      refetch={refetch}
      hasRefreshControl
      hasNextPage={hasNextPage}
      onScroll={e => {
        'worklet';

        scrollYRef.value = e.nativeEvent.contentOffset.y;
      }}
      getFixedItemSize={() => ITEM_HEIGHT}
      contentContainerClassName='pt-2 px-4'
      contentContainerStyle={{
        paddingBottom: bottomTab,
      }}
    />
  );
}
