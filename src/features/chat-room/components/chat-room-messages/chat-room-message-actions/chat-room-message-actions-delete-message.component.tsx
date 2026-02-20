import dayjs from 'dayjs'
import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/COLORS'
import { useToast } from '@/components/chill-ui-library'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { MessageCollectionItemDto } from '@/api/generated/model'

import ChatRoomMessageActionsItem from './chat-room-message-actions-item.component'

const WAIT_TIME_BEFORE_CLOSING_MODAL = 200

const MIN_TIME_BEFORE_DELETING_MESSAGE = 5 * 60 * 1000 // 5 MIN

type ChatRoomMessageActionsDeleteMessageProps = {
  message: MessageCollectionItemDto
}

export default function ChatRoomMessageActionsDeleteMessage({ message }: ChatRoomMessageActionsDeleteMessageProps) {
  const { createdAt: messageCreatedAt, isSender: isSenderMe, uid: messageId } = message || {}
  const { t } = useTranslate()
  const { toast } = useToast()
  const router = useRouter()
  const { trackError } = useAnalytics()

  const isMessageOldThan5Minutes = dayjs(messageCreatedAt).isBefore(dayjs().subtract(MIN_TIME_BEFORE_DELETING_MESSAGE, 'millisecond'))

  if (isMessageOldThan5Minutes || !isSenderMe) return null

  const handleDeleteMessage = async () => {
    if (!messageId) return
    try {
      toast({
        title: t('chat-room.chat-room-messages.message_deleted'),
        variant: 'info',
      })
      setTimeout(() => {
        router.back()
      }, WAIT_TIME_BEFORE_CLOSING_MODAL)

    } catch (error) {
      trackError({ error })
    }
  }



  return (
    <ChatRoomMessageActionsItem
      iconProps={{ color: COLORS.danger, name: 'trash-solid' }}
      stringProps={{ colorVariant: 'danger' }}
      title={t('common.withdraw')}
      onPress={handleDeleteMessage}
    />
  )
}