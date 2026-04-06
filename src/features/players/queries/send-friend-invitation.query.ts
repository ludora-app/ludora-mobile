import { useFriendsCreate } from '@generatedApi/friends/friends.api';

import { useInvalidateFriendsFindMyFriendRequest, useInvalidateUsersFindAll } from '@/api/generated/invalidate-queries';

export const useSendFriendInvitation = () => {
  const invalidateFriendRequest = useInvalidateFriendsFindMyFriendRequest();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();
  const mutation = useFriendsCreate({
    mutation: {
      onSuccess: (_data, variables) => {
        invalidateFriendRequest(variables?.data?.receiverUid);
        invalidateUsersFindAll();
      },
    },
  });

  const mutateAsync = (receiverUid: string) =>
    mutation.mutateAsync({
      data: {
        receiverUid,
      },
    });

  return {
    ...mutation,
    mutateAsync,
  };
};
