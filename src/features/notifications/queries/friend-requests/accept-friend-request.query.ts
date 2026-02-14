import { useFriendsUpdate } from '@generatedApi/friends/friends.api';

import { useInvalidateNotificationsFindAll } from '@/api/generated/invalidate-queries';

export const useAcceptFriendRequest = (friendUid: string) => {
  const invalidateNotifications = useInvalidateNotificationsFindAll();
  const mutation = useFriendsUpdate({
    mutation: {
      onSuccess: () => invalidateNotifications(),
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
