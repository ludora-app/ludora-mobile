import { useFriendsRemove } from '@generatedApi/friends/friends.api';

import {
  useInvalidateUsersFindAll,
  useInvalidateFriendsFindMyFriendRequest,
  useInvalidateUsersFindOne,
} from '@/api/generated/invalidate-queries';

export const useRemoveFriend = (userUid: string) => {
  const invalidateUserFriendRequest = useInvalidateFriendsFindMyFriendRequest();
  const invalidateUsersAll = useInvalidateUsersFindAll();
  const invalidateUserFindOne = useInvalidateUsersFindOne();
  const mutate = useFriendsRemove({
    mutation: {
      onSuccess: () => {
        invalidateUserFriendRequest(userUid);
        invalidateUsersAll();
        invalidateUserFindOne(userUid);
      },
    },
  });

  const mutateAsync = () => mutate.mutateAsync({ otherUserUid: userUid });

  return {
    ...mutate,
    mutateAsync,
  };
};
