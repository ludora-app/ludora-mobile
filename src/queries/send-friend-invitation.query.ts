import { useFriendsCreate } from '@generatedApi/friends/friends.api';

import {
  useInvalidateFriendsFindMyFriendRequest,
  useInvalidateUsersFindAll,
  useInvalidateUsersFindOne,
} from '@/api/generated/invalidate-queries';

export const useSendFriendInvitation = (userId?: string) => {
  const invalidateFriendRequest = useInvalidateFriendsFindMyFriendRequest();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();
  const invalidateUsersFindOne = useInvalidateUsersFindOne();
  const mutation = useFriendsCreate({
    mutation: {
      onSuccess: () => {
        invalidateFriendRequest(userId || '');
        invalidateUsersFindAll();
        invalidateUsersFindOne(userId || '');
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
