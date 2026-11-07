import { useUsersUpdatePlayArea } from '@generatedApi/users/users.api';

import { UpdatePlayAreaDto } from '@/api/generated/model';
import {
  useInvalidateUsersFindMe,
  useInvalidateFieldsFindAllVerified,
  useInvalidateSessionsFindRecommended,
} from '@/api/generated/invalidate-queries';

export const useUpdatePlayArea = () => {
  const invalidateUserMe = useInvalidateUsersFindMe();
  const invalidateFieldsFindAllVerified = useInvalidateFieldsFindAllVerified();
  const invalidateSessionsFindRecommended = useInvalidateSessionsFindRecommended();
  const mutation = useUsersUpdatePlayArea({
    mutation: {
      // The fields and the recommended sessions are searched inside the play area
      onSuccess: () =>
        Promise.all([invalidateUserMe(), invalidateFieldsFindAllVerified({}), invalidateSessionsFindRecommended()]),
    },
  });

  const mutateAsync = (playArea: UpdatePlayAreaDto) => mutation.mutateAsync({ data: playArea });

  return {
    ...mutation,
    mutateAsync,
  };
};
