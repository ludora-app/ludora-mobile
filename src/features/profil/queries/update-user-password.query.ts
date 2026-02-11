import { UpdatePasswordDto } from '@/api/generated/model';
import { useUsersUpdatePassword } from '@/api/generated/api/users/users.api';

export const useUpdateUserPassword = () => {
  const mutation = useUsersUpdatePassword();

  const mutateAsync = (data: UpdatePasswordDto) => mutation.mutateAsync({ data });

  const mutate = (data: UpdatePasswordDto) => mutation.mutate({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
