import { useState } from 'react'
import { useToast } from '@chillui/ui'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/COLORS'
import { MessageCollectionItemDto } from '@/api/generated/model'

import ChatRoomMessageActionsItem from './chat-room-message-actions-item.component'
import { useChatRoomMessageOptimisticQueue } from '../../../queries/chat-room-message-queue.query'
import { useChatRoomOptimisticMessagesStore } from '../../../store/chat-room-optimistic-messages.store'


type ChatRoomMessageActionsRetrySendProps = {
  message: MessageCollectionItemDto
}

const WAIT_TIME_BEFORE_CLOSING_MODAL = 200

const WAIT_TIME_BEFORE_RETRY = 400

export default function ChatRoomMessageActionsRetrySend({ message }: ChatRoomMessageActionsRetrySendProps) {
  const { isSender: isSenderMe, uid: messageId } = message || {}
  const { t } = useTranslate()
  const router = useRouter()
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
    setTimeout(() => {
      router.back()
      setTimeout(() => {
        retryOptimisticMessage(messageId)
        setIsRetrying(false)
      }, WAIT_TIME_BEFORE_RETRY)
    }, WAIT_TIME_BEFORE_CLOSING_MODAL)
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