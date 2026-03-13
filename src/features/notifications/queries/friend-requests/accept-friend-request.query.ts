import { useFriendsUpdate } from '@generatedApi/friends/friends.api';

import {
  useInvalidateFriendsFindAllMyFriends,
  useInvalidateNotificationsFindAll,
  useInvalidateUsersFindMe,
  useInvalidateUsersFindOne,
} from '@/api/generated/invalidate-queries';

export const useAcceptFriendRequest = (friendUid: string) => {
  const invalidateNotifications = useInvalidateNotificationsFindAll();
  const invalidateUserMe = useInvalidateUsersFindMe();
  const invalidateUserByUid = useInvalidateUsersFindOne();
  const invalidateAllMyFriends = useInvalidateFriendsFindAllMyFriends();

  const mutation = useFriendsUpdate({
    mutation: {
      onSuccess: () => {
        invalidateNotifications();
        invalidateUserMe();
        invalidateUserByUid(friendUid);
        invalidateAllMyFriends();
      },
    },
  });

  const mutateAsync = () =>
    mutation.mutateAsync({
      data: {
        status: 'ACCEPTED',
      },
      userUid: friendUid,
    });

  return {
    ...mutation,
    mutateAsync,
  };
};
