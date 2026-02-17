import type { ViewToken } from 'react-native';

import { List } from '@ludo/ui';
import { useCallback } from 'react';

import Loading from '@/components/ui/loading/loading.component';

import type { Message } from '../../../mocks/messages.mock';

import ChatRoomMessageListHeaderDate from './chat-room-message-list-header-date.component';
import { useGetMessagesByChatroomId } from '../../../queries/get-messages-by-chatroom-id.query';
import ChatRoomMessageListItem from './chat-room-message-list-item/chat-room-message-list-item.component';
import { useChatRoomMessageOnScreenDateStore } from '../../../store/chat-room-message-on-screen-date.store';

export default function ChatRoomMessagesList() {
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetMessagesByChatroomId();

  console.log('messageChatRoom', items);
  const setMessageCurrentDate = useChatRoomMessageOnScreenDateStore(state => state.setMessageCurrentDate);

  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        const firstVisibleItem = viewableItems[0];
        if (firstVisibleItem?.item) {
          const message = firstVisibleItem.item as Message;
          setMessageCurrentDate(message.created_at);
        }
      }
    },
    [setMessageCurrentDate],
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <ChatRoomMessageListHeaderDate />
      <List
        data={items}
        ItemComponent={ChatRoomMessageListItem}
        isLoading={isLoading}
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isRefetching={isRefetching}
        hasNextPage={hasNextPage}
        refetch={refetch}
        alignItemsAtEnd
        maintainScrollAtEnd
        maintainScrollAtEndThreshold={0.1}
        maintainVisibleContentPosition
        contentContainerClassName="pt-2 bg-white px-4"
        emptyResultProps={{
          center: true,
          hasRandomTitle: true,
          iconNames: ["ludo-sunglass", "ludo-eating-pizza"],
          randomOptions: 3,
          title: "chat-room.chat-room-messages-list-empty.title_v",
        }}
      // onViewableItemsChanged={handleViewableItemsChanged}
      // viewabilityConfig={{
      //   itemVisiblePercentThreshold: 50,
      // }}
      />
    </>
  );
}
