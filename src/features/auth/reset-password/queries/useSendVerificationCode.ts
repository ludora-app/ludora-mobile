import { VerifyMailDto } from '@api/generated/model';
import { useAuthB2c } from '@generatedApi/auth-b2-c/auth-b2-c.api';

export const useSendVerificationCode = () => {
  const mutation = useAuthB2CResendVerificationCode();

  const mutate = async (data: VerifyMailDto) => {
    mutation.mutate({
      data,
    });
  };

  const mutateAsync = async (data: VerifyMailDto) => {
    await mutation.mutateAsync({ data });
  };

  return {
    mutate,
    mutateAsync,
    ...mutation,
  };
};
