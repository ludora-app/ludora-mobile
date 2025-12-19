import { setTempToken } from '@/api/api.instance';
import { ForgottenPasswordDto } from '@/api/generated/model';
import { useAuthB2CPasswordReset } from '@/api/generated/api/auth-b2-c/auth-b2-c.api';

export const useNewPassword = (resetToken: string) => {
  const mutation = useAuthB2CPasswordReset();

  const mutateAsync = async (data: ForgottenPasswordDto) => {
    setTempToken(resetToken);
    mutation.mutateAsync(
      { data },
      {
        onSuccess: () => {
          setTempToken(null);
        },
      },
    );
  };

  const mutate = async (data: ForgottenPasswordDto) => {
    setTempToken(resetToken);
    mutation.mutate(
      { data },
      {
        onSettled: () => {
          setTempToken(null);
        },
      },
    );
  };

  return {
    mutate,
    mutateAsync,
    ...mutation,
  };
};
