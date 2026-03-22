import { Box } from '@ludo/ui'
import { useEffect } from 'react'

import ChatRoomMessageActionsMenuLayout from './chat-room-message-actions-menu-layout.component';
import { useChatRoomMessageActionsMenuStore } from '../../../store/chat-room-message-actions-menu.store'
import { chatRoomMessageListItemWrapperTv } from '../../styles/chat-room-message-list-item-wrapper.styles'
import { useChatRoomMessageActionsMenuPosition } from '../../../hooks/chat-room-message-actions-menu-position';
import ChatRoomMessageActionsItemRetrySend from './chat-room-message-actions-item/chat-room-message-actions-item-retry-send.component'
import ChatRoomMessageActionsItemCopyMessage from './chat-room-message-actions-item/chat-room-message-actions-item-copy-message.component'
import ChatRoomMessageActionsItemDeleteMessage from './chat-room-message-actions-item/chat-room-message-actions-item-delete-message.component'
import ChatRoomMessageListItemContent from '../chat-room-messages-list/chat-room-message-list-item/chat-room-messages-list-item-content/chat-room-message-list-item-content.component'


export default function ChatRoomMessageActionsMenu() {
  const pressedMessageData = useChatRoomMessageActionsMenuStore(state => state.pressedMessageData)
  const { globalStatus, isSender } = pressedMessageData || {}

  const setAnchor = useChatRoomMessageActionsMenuStore(state => state.setAnchor)

  const {
    anchor,
    isMeasured,
    menuPositionStyle,
    onMenuLayout,
  } = useChatRoomMessageActionsMenuPosition()

  useEffect(() => () => setAnchor(null), [setAnchor])

  if (!pressedMessageData) return null

  return (
    <ChatRoomMessageActionsMenuLayout>
      {
        anchor && (
          <Box
            className={chatRoomMessageListItemWrapperTv({
              isMessageDeleted: globalStatus === 'DELETED',
              isMessageFromMe: isSender,
            })}
            style={{
              height: anchor.height,
              left: anchor.x,
              position: 'absolute',
              top: anchor.y,
              width: anchor.width,
            }}
          >
            <ChatRoomMessageListItemContent messageData={pressedMessageData as any} />
          </Box>
        )
      }
      <Box
        className='bg-white border border-ring/20 w-40 rounded-xl py-2'
        style={[menuPositionStyle, { opacity: isMeasured ? 1 : 0 }]}
        onLayout={onMenuLayout}
        onStartShouldSetResponder={() => true}
      >
        <ChatRoomMessageActionsItemRetrySend message={pressedMessageData} />
        <ChatRoomMessageActionsItemCopyMessage message={pressedMessageData} />
        <ChatRoomMessageActionsItemDeleteMessage message={pressedMessageData} />
      </Box>
    </ChatRoomMessageActionsMenuLayout>
  )
}