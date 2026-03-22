import { useState } from 'react'
import { useToast } from '@chillui/ui'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/colors.contstants'
import { MessageCollectionItemDto } from '@/api/generated/model'

import ChatRoomMessageActionsItem from './chat-room-message-actions-item.component'
import { useChatRoomOptimisticMessagesStore } from '../../../../store/chat-room-optimistic-messages.store'
import { useChatRoomMessageOptimisticQueue } from '../../../../queries/chat-room-message-queue/chat-room-message-queue.query'

type ChatRoomMessageActionsRetrySendProps = {
  message: MessageCollectionItemDto
}

export default function ChatRoomMessageActionsItemRetrySend({ message }: ChatRoomMessageActionsRetrySendProps) {
  const { isSender: isSenderMe, uid: messageId } = message || {}
  const { t } = useTranslate()
  const { toast } = useToast()
  const [isRetrying, setIsRetrying] = useState(false)
  const { retryOptimisticMessage } = useChatRoomMessageOptimisticQueue()
  const isFailedMessage = useChatRoomOptimisticMessagesStore(
    store => messageId ? store.pendingMessages[messageId]?.isError === true : false,
  )

  if (!isFailedMessage || !isSenderMe) return null

  const handleRetry = () => {
    if (!messageId || isRetrying) return
    setIsRetrying(true)

    toast({
      title: t('chat.message_retry_sent'),
      variant: 'info',
    })
    retryOptimisticMessage(messageId)
    setIsRetrying(false)
  }

  return (
    <ChatRoomMessageActionsItem
      iconProps={{ color: COLORS.danger, name: 'redo-arrow-solid' }}
      stringProps={{ colorVariant: 'danger' }}
      title={t('common.retry')}
      onPress={handleRetry}
    />
  )
}