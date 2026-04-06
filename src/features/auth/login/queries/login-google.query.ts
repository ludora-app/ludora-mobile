import { useAuthB2CCreateOrConnectGoogleUser } from '@generatedApi/auth-b2c/auth-b2c.api';

import { useAuthHelpers } from '@/hooks/auth-helpers.hook';
import { CreateGoogleUserDto } from '@/api/generated/model';
import { useSignIn as useGoolgleProviderSignIn } from '@/api/hooks/auth-google.hook';

export default function useLoginGoogle() {
  const { isPending: isGoogleProviderSignInPending, mutateAsync: googleProviderSignInMutation } =
    useGoolgleProviderSignIn();
  const { isPending: isGoogleLoginUserPending, mutateAsync: googleLogin } = useAuthB2CCreateOrConnectGoogleUser();
  const { login } = useAuthHelpers();

  const mutateAsync = async () => {
    const googleResponse = await googleProviderSignInMutation();

    if (!googleResponse.data) {
      throw new Error('Google sign-in did not return user data');
    }

    const { email, familyName, givenName, photo } = googleResponse.data.user;

    if (!email) {
      throw new Error('Google sign-in did not return email');
    }

    const userData: CreateGoogleUserDto = {
      email,
      firstname: givenName ?? '',
      imageUrl: photo ?? undefined,
      lastname: familyName ?? '',
    };

    const response = await googleLogin({ data: userData });
    const { accessToken, refreshToken } = response.data;
    login({ accessToken, refreshToken });
    return response;
  };

  return {
    isPending: isGoogleProviderSignInPending || isGoogleLoginUserPending,
    mutateAsync,
  };
}
