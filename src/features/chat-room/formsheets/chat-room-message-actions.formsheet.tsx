import { BoxRow } from '@ludo/ui'
import { useLocalSearchParams } from 'expo-router'

import { ChatRoomMessageActionsLocalSearchParams } from '../types/chat-room.types'
import { useGetMessagesByChatroomId } from '../queries/get-messages-by-chatroom-id.query'
import ChatRoomMessageActionsRetrySend from '../components/chat-room-messages/chat-room-message-actions/chat-room-message-actions-retry-send.component'
import ChatRoomMessageActionsCopyMessage from '../components/chat-room-messages/chat-room-message-actions/chat-room-message-actions-copy-message.component'
import ChatRoomMessageActionsDeleteMessage from '../components/chat-room-messages/chat-room-message-actions/chat-room-message-actions-delete-message.component'

export default function ChatRoomMessageActionsFormsheet() {
  const { messageId } = useLocalSearchParams<ChatRoomMessageActionsLocalSearchParams>()
  const { items: messages } = useGetMessagesByChatroomId()
  const selectedMessage = messages.find(item => item.uid === messageId)

  return (
    <BoxRow className='items-center'>
      <ChatRoomMessageActionsRetrySend message={selectedMessage} />
      <ChatRoomMessageActionsCopyMessage message={selectedMessage} />
      <ChatRoomMessageActionsDeleteMessage message={selectedMessage} />
    </BoxRow >
  )
}