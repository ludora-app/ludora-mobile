import { useTranslate } from '@tolgee/react';

import COLORS from '@/constants/colors.contstants';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { MessageCollectionItemDto } from '@/api/generated/model';
import { useChatRoomStore } from '@/features/chat-room/store/chat-room.store';
import { useDeleteMessageMutation } from '@/features/chat-room/queries/chat-room-message-queue/delete-message.query';

import ChatRoomMessageActionsItem from './chat-room-message-actions-item.component';


type ChatRoomMessageActionsDeleteMessageProps = {
  message: MessageCollectionItemDto
}

export default function ChatRoomMessageActionsItemDeleteMessage({ message }: ChatRoomMessageActionsDeleteMessageProps) {
  const chatRoomId = useChatRoomStore(state => state.chatRoomId)
  const { isSender: isSenderMe, uid: messageId } = message || {}
  const { t } = useTranslate()
  const { trackError } = useAnalytics();
  const { mutateAsync: deleteMessage } = useDeleteMessageMutation(chatRoomId)

  if (!isSenderMe) return null

  const handleDeleteMessage = async () => {
    if (!messageId) return
    try {
      await deleteMessage({ messageUid: messageId })
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