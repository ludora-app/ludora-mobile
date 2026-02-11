import { useUsersUpdate } from '@generatedApi/users/users.api';

import { UpdateUserDto } from '@/api/generated/model';
import { useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';

export const useUpdateUserMe = () => {
  const invalidateUserMe = useInvalidateUsersFindMe();
  const mutation = useUsersUpdate({
    mutation: {
      onSuccess: () => invalidateUserMe(),
    },
  });

  const mutateAsync = (userMe: UpdateUserDto) => mutation.mutateAsync({ data: userMe });

  const mutate = (userMe: UpdateUserDto) => mutation.mutate({ data: userMe });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
