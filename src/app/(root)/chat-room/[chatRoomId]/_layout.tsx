import { Slot } from 'expo-router';

import { ChatRoomProvider } from '@/features/chat-room/context/chat-room-store-context';

export default function ChatRoomIdLayout() {
  return (
    <ChatRoomProvider>
      <Slot />
    </ChatRoomProvider>
  );
}
