import { useAuthB2CCreateOrConnectAppleUser } from '@generatedApi/auth-b2c/auth-b2c.api';

import { CreateAppleUserDto } from '@/api/generated/model';
import { useAuthHelpers } from '@/hooks/auth-helpers.hook';

export const useLoginApple = () => {
  const { isPending: isAppleLoginUserPending, mutateAsync: appleLogin } = useAuthB2CCreateOrConnectAppleUser();
  const { login } = useAuthHelpers();

  const mutateAsync = async (data: CreateAppleUserDto) => {
    const response = await appleLogin({ data });
    const { accessToken, refreshToken } = response.data;
    login({ accessToken, refreshToken });
    return response;
  };

  return {
    isPending: isAppleLoginUserPending,
    mutateAsync,
  };
};
