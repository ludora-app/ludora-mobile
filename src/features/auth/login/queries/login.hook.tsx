import { useAuthB2CLogin } from '@generatedApi/auth-b2-c/auth-b2-c.api';
import { LoginB2CDto } from '@api/generated/model';

export const useLogin = () => {
  const mutation = useAuthB2CLogin();

  const mutate = (data: LoginB2CDto) => {
    mutation.mutate({ data });
  };

  const mutateAsync = async (data: LoginB2CDto) => {
    return mutation.mutateAsync({ data });
  };

  return {
    mutate,
    mutateAsync,
    ...mutation,
  };
};
