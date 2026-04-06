import { useFriendsUpdate } from '@generatedApi/friends/friends.api';

export const useDeclineFriendRequest = (friendUid?: string) => {
  const mutate = useFriendsUpdate();

  const mutateAsync = () => {
    if (!friendUid) throw new Error('Friend UID is required');
    return mutate.mutateAsync({ data: { status: 'REJECTED' }, userUid: friendUid });
  };

  return {
    ...mutate,
    mutateAsync,
  };
};
