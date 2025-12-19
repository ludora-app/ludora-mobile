import { GenerateAccessTokenFromCodeDto } from '@/api/generated/model';
import { useAuthB2CGenerateAccessTokenFromCode } from '@/api/generated/api/auth-b2-c/auth-b2-c.api';

export const useVerifyCode = () => {
  const mutation = useAuthB2CGenerateAccessTokenFromCode();

  const mutate = async (data: GenerateAccessTokenFromCodeDto) => {
    mutation.mutate({ data });
  };

  const mutateAsync = async (data: GenerateAccessTokenFromCodeDto) => {
    await mutation.mutateAsync({ data });
  };

  return {
    mutate,
    mutateAsync,
    ...mutation,
  };
};
