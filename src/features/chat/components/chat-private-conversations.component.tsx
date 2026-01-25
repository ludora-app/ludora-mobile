import { Wrapper } from '@components/nysaUi';

import { useGetPrivateChatRooms } from '../queries/get-chatrooms.query';
import ChatScreenConversationWrapperList from './chat-conversation-wrapper-list';

export default function ChatScreenPrivateConversations() {
  const { data: chatRooms, error, isLoading } = useGetPrivateChatRooms();

  return (
    <Wrapper safeAreaView={false} className="pt-5">
      <ChatScreenConversationWrapperList conversationsData={chatRooms} />
    </Wrapper>
  );
}
