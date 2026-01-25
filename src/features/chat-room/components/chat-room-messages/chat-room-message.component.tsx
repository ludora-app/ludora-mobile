import { Box } from '@components/nysaUi';
import { ViewToken } from 'react-native';
import { useShallow } from 'zustand/shallow';
import { useCallback, useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';

import ChatRoomMessagesDate from './ChatRoomMessagesDate';
import ChatRoomMessageWrapper from './ChatRoomMessageWrapper';
import { useChatRoomRouter } from '../../hooks/useChatRoomRouter';
import { useGetMessageByChatRoomId } from '../../queries/useGetMessageByChatRoomId';
import { useChatRoomMessageDateStore } from '../../store/chatRoomMessageDate.store';

export default function ChatRoomMessage() {
  const { chatRoomId } = useChatRoomRouter();
  const { messages } = useGetMessageByChatRoomId(chatRoomId);

  const { setMessageCurrentDate } = useChatRoomMessageDateStore(
    useShallow(state => ({
      setMessageCurrentDate: state.setMessageCurrentDate,
    })),
  );

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) {
      const firstVisibleMessage = viewableItems[0].item;
      setMessageCurrentDate(firstVisibleMessage.created_at);
    }
  }, []);

  useEffect(
    () => () => {
      setMessageCurrentDate(null);
    },
    [],
  );

  return (
    <Box className="flex-1 overflow-hidden">
      <ChatRoomMessagesDate />
      <FlashList
        data={messages}
        inverted
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 10 }}
        estimatedItemSize={100}
        renderItem={({ item }) => <ChatRoomMessageWrapper messageData={item} />}
        keyExtractor={item => item.id.toString()}
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </Box>
  );
}
