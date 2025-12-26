import { LoginDto } from '@api/generated/model';
import { useAuthB2CLogin } from '@generatedApi/auth-b2-c/auth-b2-c.api';

export const useLogin = () => {
  const mutation = useAuthB2CLogin();

  const mutate = (data: LoginDto) => mutation.mutate({ data });

  const mutateAsync = async (data: LoginDto) => mutation.mutateAsync({ data });

  return {
    mutate,
    mutateAsync,
    ...mutation,
  };
};
