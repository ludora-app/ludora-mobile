import { String } from '@ludo/ui'
import { useTranslate } from '@tolgee/react'

export default function ChatRoomMessageListItemContentDeleted() {
  const { t } = useTranslate()
  return (
    <String color="#000" size="sm">{t('chat-room.chat-room-messages.message_deleted')}</String>
  )
}