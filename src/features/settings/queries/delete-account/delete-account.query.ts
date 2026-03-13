import { useUsersDeletionRequest } from '@generatedApi/users/users.api';

import { useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';

export const useDeleteAccount = () => {
  const invalidateUserMe = useInvalidateUsersFindMe();
  const mutate = useUsersDeletionRequest({
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
