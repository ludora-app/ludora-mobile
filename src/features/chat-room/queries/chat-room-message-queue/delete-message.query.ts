import { useTranslate } from '@tolgee/react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useConversationsDeleteMessage,
  getConversationsLoadMoreMessagesQueryKey,
} from '@generatedApi/conversations/conversations.api';

import { useToast } from '@/components/chill-ui-library';
import { MessageCollectionItemDtoGlobalStatus } from '@/api/generated/model';

import { MessagesInfiniteData } from './chat-room-message-queue.types';
import { useChatRoomOptimisticMessagesStore } from '../../store/chat-room-optimistic-messages.store';

export const useDeleteMessageMutation = (chatRoomId?: string) => {
  const { t } = useTranslate();
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const removePendingMessage = useChatRoomOptimisticMessagesStore(state => state.removePendingMessage);
  const pendingMessages = useChatRoomOptimisticMessagesStore(state => state.pendingMessages);

  const mutation = useConversationsDeleteMessage();

  const mutateAsync = async (data: { messageUid: string }) => {
    const { messageUid } = data;
    const isFailedMessage = pendingMessages[messageUid]?.isError === true;

    const updateCache = () => {
      const queryKey = getConversationsLoadMoreMessagesQueryKey(chatRoomId ?? '', { limit: 10 });
      queryClient.setQueryData<MessagesInfiniteData>(queryKey, oldData => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map(item =>
                item.uid === messageUid
                  ? { ...item, globalStatus: MessageCollectionItemDtoGlobalStatus.DELETED }
                  : item,
              ),
            },
          })),
        };
      });
    };

    if (isFailedMessage) {
      removePendingMessage(messageUid);
      updateCache();
    } else {
      updateCache();
      await mutation.mutateAsync({ messageUid, uid: chatRoomId ?? '' });
    }

    toast({
      title: t('chat-room.chat-room-messages.message_deleted'),
      variant: 'info',
    });
  };

  return {
    ...mutation,
    mutateAsync,
  };
};
