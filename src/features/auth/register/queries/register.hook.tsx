import { RegisterB2CWithFileDto } from '@/api/generated/model';
import { useAuthB2CRegister } from '@generatedApi/auth-b2-c/auth-b2-c.api';

export const useRegister = () => {
  const mutation = useAuthB2CRegister();

  const mutate = (data: RegisterB2CWithFileDto) => {
    mutation.mutate({ data });
  };

  const mutateAsync = async (data: RegisterB2CWithFileDto) => {
    return mutation.mutateAsync({ data });
  };

  return {
    mutate,
    mutateAsync,
    ...mutation,
  };
};
