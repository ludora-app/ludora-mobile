import { useFriendsCreate } from '@generatedApi/friends/friends.api';

import { useInvalidateFriendsFindMyFriendRequest, useInvalidateUsersFindAll } from '@/api/generated/invalidate-queries';

export const useSendFriendInvitation = (userId?: string) => {
  const invalidateFriendRequest = useInvalidateFriendsFindMyFriendRequest();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();
  const mutation = useFriendsCreate({
    mutation: {
      onSuccess: () => {
        invalidateFriendRequest(userId || '');
        invalidateUsersFindAll();
      },
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
