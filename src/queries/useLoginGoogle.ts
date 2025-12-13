import { useToast } from '@chillui/ui';

import { useAuthHelpers } from '@/hooks/auth-helpers.hook';
import { useSignIn as useGoolgleProviderSignIn } from '@/api/hooks/auth-google.hook';

export const ERROR_MESSAGE = "Une erreur est survenue ! Si le problème persiste, contactez l'assistance.";

export default function useLoginGoogle() {
  const { isPending: isGoogleProviderSignInPending, mutateAsync: googleProviderSignInMutation } =
    useGoolgleProviderSignIn();
  // const { isPending: isGoogleLoginUserPending, mutateAsync: googleLoginUserMutation } = useAuthGoogleLogin();
  const { login } = useAuthHelpers();
  const { toast } = useToast();

  const mutateAsync = async () => {
    try {
      const response = await googleProviderSignInMutation();

      console.log(response);

      // const response = await googleLoginUserMutation({ data: userData });
      // const token = response.data.access_token;
      // login(token);
    } catch (error: unknown) {
      console.log(error);
      toast({
        message: ERROR_MESSAGE,
        variant: 'error',
      });
    }
  };

  return {
    isPending: isGoogleProviderSignInPending,
    mutateAsync,
  };
}
