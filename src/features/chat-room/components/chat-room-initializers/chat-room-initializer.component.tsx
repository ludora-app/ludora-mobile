import ChatRoomIdInitializer from './chat-room-id-initializer.component'
import ChatRoomInfoInitializer from './chat-room-info-initializer.component'
import ChatRoomMessagesReadFallbackInitializer from './chat-room-messages-read-fallback-initializer.component';

export default function ChatRoomInitializer() {

  return (
    <>
      <ChatRoomIdInitializer />
      <ChatRoomInfoInitializer />
      <ChatRoomMessagesReadFallbackInitializer />
    </>
  )
}