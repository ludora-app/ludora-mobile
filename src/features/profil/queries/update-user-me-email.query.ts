import { UpdateUserEmailDto } from '@/api/generated/model';
import { useUsersUpdateEmail } from '@/api/generated/api/users/users.api';
import { useInvalidateUsersFindMe } from '@/api/generated/invalidate-queries';

export const useUpdateUserMeEmail = () => {
  const invalidateUserMe = useInvalidateUsersFindMe();
  const mutation = useUsersUpdateEmail({
    mutation: {
      onSuccess: () => invalidateUserMe(),
    },
  });

  const mutateAsync = (email: UpdateUserEmailDto) => mutation.mutateAsync({ data: email });

  const mutate = (email: UpdateUserEmailDto) => mutation.mutate({ data: email });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
