import { FlashList } from '@shopify/flash-list';
import { ChatRoom } from '@api/utils/api.types';

import ChatScreenConversationsWrapper from './chat-conversations-wrapper.component';

export default function ChatScreenConversationWrapperList({
  conversationsData,
}: {
  conversationsData: ChatRoom[] | undefined;
}) {
  return (
    <FlashList
      data={conversationsData}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ChatScreenConversationsWrapper conversation={item} />}
      keyExtractor={(item: ChatRoom) => item.id.toString()}
      estimatedItemSize={100}
    />
  );
}
