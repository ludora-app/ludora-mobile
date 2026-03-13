import { useUsersCancelDeletionRequest } from '@generatedApi/users/users.api';

import { useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';

export const useCancelDeleteAccount = () => {
  const invalidateUserMe = useInvalidateUsersFindMe();
  const mutate = useUsersCancelDeletionRequest({
    mutation: {
      onSuccess: () => {
        invalidateUserMe();
      },
    },
  });

  const mutateAsync = () => mutate.mutateAsync();

  return {
    ...mutate,
    mutateAsync,
  };
};
