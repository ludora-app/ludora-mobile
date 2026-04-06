import { GenerateAccessTokenFromCodeDto } from '@/api/generated/model';
import { useAuthB2CGenerateAccessTokenFromCode } from '@/api/generated/api/auth-b2c/auth-b2c.api';

export const useVerifyCode = () => {
  const mutation = useAuthB2CGenerateAccessTokenFromCode();

  const mutate = async (data: GenerateAccessTokenFromCodeDto) => {
    mutation.mutate({ data });
  };

  const mutateAsync = async (data: GenerateAccessTokenFromCodeDto) => mutation.mutateAsync({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
