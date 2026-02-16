import { useFriendsUpdate } from '@generatedApi/friends/friends.api';

import { useInvalidateNotificationsFindAll, useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';

export const useAcceptFriendRequest = (friendUid: string) => {
  const invalidateNotifications = useInvalidateNotificationsFindAll();
  const invalidateUserMe = useInvalidateUsersFindMe();

  const mutation = useFriendsUpdate({
    mutation: {
      onSuccess: () => {
        invalidateNotifications();
        invalidateUserMe();
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
