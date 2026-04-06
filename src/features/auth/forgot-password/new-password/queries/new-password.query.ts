import { ForgottenPasswordDto } from '@/api/generated/model';
import { useResetUserPassword } from '@/api/hooks/reset-user-password.hook';

export const useNewPassword = () => {
  const mutation = useResetUserPassword();

  const mutateAsync = async (data: ForgottenPasswordDto & { resetToken: string }) =>
    mutation.mutateAsync({ newPassword: data.newPassword, resetToken: data.resetToken });

  const mutate = (data: ForgottenPasswordDto & { resetToken: string }) => {
    mutation.mutate({ newPassword: data.newPassword, resetToken: data.resetToken });
  };

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
