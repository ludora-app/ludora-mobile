import { useRouter } from 'expo-router'
import { useTranslate } from '@tolgee/react'

import COLORS from '@/constants/colors.contstants'
import { useToast } from '@/components/chill-ui-library'
import { useAnalytics } from '@/hooks/analytics-trackers.hook'
import { MessageCollectionItemDto } from '@/api/generated/model'
import { useChatRoomStore } from '@/features/chat-room/store/chat-room.store'
import { useDeleteMessageMutation } from '@/features/chat-room/queries/delete-message.query'

import ChatRoomMessageActionsItem from './chat-room-message-actions-item.component'

const WAIT_TIME_BEFORE_CLOSING_MODAL = 200


type ChatRoomMessageActionsDeleteMessageProps = {
  message: MessageCollectionItemDto
}

export default function ChatRoomMessageActionsDeleteMessage({ message }: ChatRoomMessageActionsDeleteMessageProps) {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId)
  const { isSender: isSenderMe, uid: messageId } = message || {}
  const { t } = useTranslate()
  const { toast } = useToast()
  const router = useRouter()
  const { trackError } = useAnalytics()
  const { mutateAsync: deleteMessage } = useDeleteMessageMutation(chatRoomId)



  if (!isSenderMe) return null

  const handleDeleteMessage = async () => {
    if (!messageId) return
    try {
      await deleteMessage({ messageUid: messageId })
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