import { useConversationsDeleteMessage } from '@generatedApi/conversations/conversations.api';

import { useInvalidateConversationsLoadMoreMessages } from '@/api/generated/invalidate-queries';

export const useDeleteMessageMutation = (chatRoomId: string) => {
  const invalidateChatRoomMessages = useInvalidateConversationsLoadMoreMessages();
  const mutation = useConversationsDeleteMessage({
    mutation: {
      onSuccess: () => invalidateChatRoomMessages(chatRoomId),
    },
  });

  const mutateAsync = (data: { messageUid: string }) =>
    mutation.mutateAsync({ messageUid: data.messageUid, uid: chatRoomId });

  return {
    ...mutation,
    mutateAsync,
  };
};
