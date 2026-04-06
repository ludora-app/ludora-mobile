import { Stack } from 'expo-router';

import { ChatRoomProvider } from '@/features/chat-room/context/chat-room-store-context';

export default function ChatRoomIdLayout() {
  return (
    <ChatRoomProvider>
      <Stack screenOptions={{ animation: 'slide_from_right', headerShown: false }} />
    </ChatRoomProvider>
  );
}
