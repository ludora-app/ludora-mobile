import { useMutation } from '@tanstack/react-query';
import { QUERY_KEY } from '@api/utils/api.queryKey';

import { signIn, signOut } from '@/api/queries/auth-google.query';

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
    mutationKey: [QUERY_KEY.GOOGLE_SIGN_IN],
  });
}

export function useSignOut() {
  return useMutation({
    mutationFn: signOut,
    mutationKey: [QUERY_KEY.GOOGLE_SIGN_OUT],
  });
}
