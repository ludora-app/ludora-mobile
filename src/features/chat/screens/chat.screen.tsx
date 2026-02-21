

import ChatConversationsListSection from '../components/chat-concersations-list-section.component';
import ChatConversationsHeaderSearch from '../components/chat-conversations-header/chat-conversations-header-search.component';

export default function ChatScreen() {

  return (
    <>
      <ChatConversationsHeaderSearch />
      <ChatConversationsListSection />
    </>
  );
}
