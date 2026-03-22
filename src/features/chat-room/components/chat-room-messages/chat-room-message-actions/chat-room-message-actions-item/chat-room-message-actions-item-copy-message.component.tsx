import { useState } from 'react'
import { useToast } from '@chillui/ui'
import * as Clipboard from 'expo-clipboard'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/colors.contstants'
import { MessageCollectionItemDto } from '@/api/generated/model'

import ChatRoomMessageActionsItem from './chat-room-message-actions-item.component'

type ChatRoomMessageActionsCopyMessageProps = {
  message: MessageCollectionItemDto
}

export default function ChatRoomMessageActionsItemCopyMessage(props: ChatRoomMessageActionsCopyMessageProps) {
  const { message } = props
  const { content: messageContent } = message || {}
  const { t } = useTranslate()
  const { toast } = useToast()
  const [isCopying, setIsCopying] = useState(false)

  const handleCopy = async () => {
    if (isCopying) return
    setIsCopying(true)
    if (messageContent) {
      await Clipboard.setStringAsync(messageContent)
    }
    toast({
      title: t('chat-room.chat-room-messages.copied_message'),
      variant: 'info',
    })
    setIsCopying(false)
  }

  return (
    <ChatRoomMessageActionsItem
      iconProps={{ color: COLORS.muted, name: 'copy-solid' }}
      stringProps={{ colorVariant: 'muted' }}
      title={t('common.copy')}
      onPress={handleCopy}
    />
  )
}