import { useModerationUnblockUser } from '@generatedApi/moderation/moderation.api';

import {
  useInvalidateModerationFindAllBlockedUsers,
  useInvalidateUsersFindAll,
  useInvalidateUsersFindOne,
} from '@/api/generated/invalidate-queries';

export const useUnblockUser = (userUid: string) => {
  const invalidateUsersBlocked = useInvalidateModerationFindAllBlockedUsers();
  const invalidateFindOneUser = useInvalidateUsersFindOne();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();
  const mutate = useModerationUnblockUser({
    mutation: {
      onSuccess: () => {
        invalidateUsersBlocked();
        invalidateFindOneUser(userUid);
        invalidateUsersFindAll();
      },
    },
  });

  const mutateAsync = () => mutate.mutateAsync({ userToUnblockUid: userUid });

  return {
    ...mutate,
    mutateAsync,
  };
};
