import React from 'react';
import { useRouter } from 'expo-router';
import * as Updates from 'expo-updates';
import { Box, Button, Separator, String } from '@ludo/ui';

import { useAuthStore } from '@/stores/auth.store';
import { useUserMe } from '@/queries/user-me.query';
import { useToast } from '@/components/chill-ui-library';
import { useAuthHelpers } from '@/hooks/auth-helpers.hook';
import { useLogin } from '@/features/auth/login/queries/login.hook';

const MOCK_USERS = [
  { email: 'seto.kaiba@hotmail.fr', password: 'Seto398!' },
  { email: 'yugi.muto@hotmail.fr', password: 'Yugi398!' },
  { email: 'joey.wheeler@hotmail.fr', password: 'Joey398!' },
  { email: 'marik.ishtar@hotmail.fr', password: 'Marik398!' },
  { email: 'yuji.itadori@hotmail.fr', password: 'Yuji398!' },
];

export default function DevToolsUserLoginSection() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const { userMe } = useUserMe(isAuthenticated);
  const router = useRouter();
  const { isPending: loginPending, mutateAsync: loginAsync } = useLogin();
  const { login } = useAuthHelpers();
  const { toast } = useToast();

  const handleLoginUser = async (user: { email: string; password: string }) => {
    try {
      router.back();
      const response = await loginAsync({ email: user?.email, password: user?.password });
      await login({
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      if (isAuthenticated) {
        Updates.reloadAsync();
      }
    } catch {
      toast({
        message: 'Une erreur est survenue',
        variant: 'error',
      });
    }
  };

  return (
    <>
      <Box className="gap-5">
        <Box>
          <String variant="body-2" font="primaryBold">
            Se connecter avec un utilisateur
          </String>
          <String variant="body-xs">
            Attention, cette action va reload l&apos;app (si connecté) et reset le cache.
          </String>
        </Box>
        <Box className="gap-2">
          {MOCK_USERS.map((user, index) => (
            <Button
              key={index}
              title={user.email}
              onPress={() => handleLoginUser(user)}
              size="md"
              variant={userMe?.email === user?.email ? 'contained' : 'outlined'}
              isLoading={loginPending}
            />
          ))}
        </Box>
      </Box>
      <Separator />
    </>
  );
}
