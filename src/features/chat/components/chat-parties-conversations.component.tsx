import { Wrapper } from '@components/nysaUi';

import { useGetEventsChatRooms } from '../queries/get-chatrooms.query';
import ChatScreenConversationWrapperList from './chat-conversation-wrapper-list';

export default function ChatScreenPartiesConversations() {
  const { data: chatRooms } = useGetEventsChatRooms();
  return (
    <Wrapper safeAreaView={false} className="mt-5">
      <ChatScreenConversationWrapperList conversationsData={chatRooms} />
    </Wrapper>
  );
}
