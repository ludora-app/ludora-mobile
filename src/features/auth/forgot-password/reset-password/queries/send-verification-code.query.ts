import { PasswordResetRequestDto } from '@api/generated/model';

import { useUsersPasswordResetRequest } from '@/api/generated/api/users/users.api';

export const useSendVerificationCodeByEmail = () => {
  const mutation = useUsersPasswordResetRequest();

  const mutate = async (data: PasswordResetRequestDto) => {
    mutation.mutate({
      data,
    });
  };

  const mutateAsync = async (data: PasswordResetRequestDto) => {
    await mutation.mutateAsync({ data });
  };

  return {
    mutate,
    mutateAsync,
    ...mutation,
  };
};
