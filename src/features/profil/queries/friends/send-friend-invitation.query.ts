import { useFriendsCreate } from '@generatedApi/friends/friends.api';

import { useInvalidateFriendsFindMyFriendRequest } from '@/api/generated/invalidate-queries';

export const useSendFriendInvitation = (userId?: string) => {
  const invalidateFriendRequest = useInvalidateFriendsFindMyFriendRequest();
  const mutation = useFriendsCreate({
    mutation: {
      onSuccess: () => invalidateFriendRequest(userId || ''),
    },
  });

  const mutateAsync = () =>
    mutation.mutateAsync({
      data: {
        receiverUid: userId,
      },
    });

  return {
    ...mutation,
    mutateAsync,
  };
};
