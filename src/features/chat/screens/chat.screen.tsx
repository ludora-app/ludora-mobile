import { useSharedValue } from 'react-native-reanimated';

import ChatConversationsList from '../components/chat-conversations-list.component';
import ChatConversationsListHeaderType from '../components/chat-conversations-header/chat-conversations-header-type.component';
import ChatConversationsHeaderSearch from '../components/chat-conversations-header/chat-conversations-header-search.component';

export default function ChatScreen() {
  const scrollY = useSharedValue(0);

  return (
    <>
      <ChatConversationsHeaderSearch />
      <ChatConversationsListHeaderType scrollY={scrollY} />
      <ChatConversationsList scrollY={scrollY} />
    </>
  );
}
