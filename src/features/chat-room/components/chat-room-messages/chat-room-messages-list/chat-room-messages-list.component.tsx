import { List } from '@ludo/ui';
import { useEffect, useRef } from 'react';
import { LegendListRef } from '@legendapp/list';

import Loading from '@/components/ui/loading/loading.component';

import { useChatRoomScrollStore } from '../../../store/chat-room-scroll.store';
import ChatRoomMessageListHeaderDate from './chat-room-message-list-header-date.component';
import { useGetMessagesByChatroomId } from '../../../queries/get-messages-by-chatroom-id.query';
import ChatRoomMessageListItem from './chat-room-message-list-item/chat-room-message-list-item.component';

export default function ChatRoomMessagesList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetMessagesByChatroomId();

  const listRef = useRef<LegendListRef>(null);
  const setScrollToEnd = useChatRoomScrollStore(state => state.setScrollToEnd);

  useEffect(() => {
    setScrollToEnd(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
    return () => setScrollToEnd(null);
  }, [setScrollToEnd]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ChatRoomMessageListHeaderDate />
      <List
        listRef={listRef}
        data={items}
        ItemComponent={ChatRoomMessageListItem}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        refetch={refetch}
        alignItemsAtEnd
        triggerEndReachedOnStart
        maintainScrollAtEnd
        keyboardDismissMode="none"
        keyboardShouldPersistTaps="handled"
        maintainScrollAtEndThreshold={0.1}
        maintainVisibleContentPosition
        contentContainerClassName="pt-2 px-4 z-20 relative"
        className='z-40'
        emptyResultProps={{
          center: true,
          hasRandomTitle: true,
          iconNames: ["ludo-sunglass", "ludo-eating-pizza"],
          randomOptions: 3,
          title: "chat-room.chat-room-messages-list-empty.title_v",
        }}
      />
    </>
  );
}
