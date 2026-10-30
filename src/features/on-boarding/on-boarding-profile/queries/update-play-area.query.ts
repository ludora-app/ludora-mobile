import { useUsersUpdatePlayArea } from '@generatedApi/users/users.api';

import { UpdatePlayAreaDto } from '@/api/generated/model';
import { useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';

export const useUpdatePlayArea = () => {
  const invalidateUserMe = useInvalidateUsersFindMe();
  const mutation = useUsersUpdatePlayArea({
    mutation: {
      onSuccess: () => invalidateUserMe(),
    },
  });

  const mutateAsync = (playArea: UpdatePlayAreaDto) => mutation.mutateAsync({ data: playArea });

  return {
    ...mutation,
    mutateAsync,
  };
};
