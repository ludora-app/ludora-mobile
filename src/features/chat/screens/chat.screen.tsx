import { TabSwitch } from '@components/nysaUi';

import ChatScreenPrivateConversations from '../components/chat-private-conversations.component';
import ChatScreenPartiesConversations from '../components/chat-parties-conversations.component';

export default function ChatScreen() {
  return (
    <TabSwitch
      leftScreenTitle="Messages privés"
      rightScreenTitle="Chat soirées"
      leftRender={<ChatScreenPrivateConversations />}
      rightRender={<ChatScreenPartiesConversations />}
    />
  );
}
