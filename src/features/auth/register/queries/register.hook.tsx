import { useAuthB2CRegister } from '@generatedApi/auth-b2c/auth-b2c.api';

import { RegisterB2CWithFileDto } from '@/api/generated/model';

export const useRegister = () => {
  const mutation = useAuthB2CRegister();

  const mutate = (data: RegisterB2CWithFileDto) => {
    mutation.mutate({ data });
  };

  const mutateAsync = async (data: RegisterB2CWithFileDto) => mutation.mutateAsync({ data });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
