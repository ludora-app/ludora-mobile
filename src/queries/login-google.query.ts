import { useAuthB2CCreateOrConnectGoogleUser } from '@generatedApi/auth-b2-c/auth-b2-c.api';

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

    const { email, familyName, givenName, photo } = googleResponse.data.user;

    const userData: CreateGoogleUserDto = {
      email,
      firstname: givenName,
      imageUrl: photo,
      lastname: familyName,
      provider: 'GOOGLE',
    };

    const response = await googleLogin({ data: userData });
    const tokens = response.data;
    login(tokens);
  };

  return {
    isPending: isGoogleProviderSignInPending || isGoogleLoginUserPending,
    mutateAsync,
  };
}
