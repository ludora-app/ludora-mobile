import { useModerationBlockUser } from '@generatedApi/moderation/moderation.api';

import {
  useInvalidateFriendsFindAllMyFriends,
  useInvalidateModerationFindAllBlockedUsers,
  useInvalidateUsersFindAll,
  useInvalidateUsersFindOne,
} from '@/api/generated/invalidate-queries';

export const useBlockUser = (userUid: string) => {
  const invalidateAllMyFriends = useInvalidateFriendsFindAllMyFriends();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();
  const invalidateUserFindOne = useInvalidateUsersFindOne();
  const invalidateBlockedUsers = useInvalidateModerationFindAllBlockedUsers();
  const mutate = useModerationBlockUser({
    mutation: {
      onSuccess: () => {
        invalidateAllMyFriends();
        invalidateUsersFindAll();
        invalidateUserFindOne(userUid);
        invalidateBlockedUsers();
      },
    },
  });

  const mutateAsync = () => mutate.mutateAsync({ userToBlockUid: userUid });

  return {
    ...mutate,
    mutateAsync,
  };
};
