import { String } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

export default function ChatRoomMessageListItemContentDeleted() {
  const { t } = useTranslate()
  return (
    <String color="#000" font="primarySemiBold">
      {t('chat-room.chat-room-messages.message_deleted')}
    </String>
  )
}