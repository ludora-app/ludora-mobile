import React from 'react';
import { useRouter } from 'expo-router';
import { Box, Button, Separator, String } from '@ludo/ui';

import { useAuthHelpers } from '@/hooks/auth-helpers.hook';

export default function DevToolsLogoutSection() {
  const { logout } = useAuthHelpers();
  const router = useRouter();

  const handleLogout = () => {
    router.back();
    setTimeout(() => {
      logout();
    }, 100);
  };

  return (
    <>
      <Box className="gap-3">
        <String variant="title-1" font="primaryBold" className="text-lg">
          Déconnexion
        </String>
        <Button title="Se déconnecter" onPress={handleLogout} />
      </Box>
      <Separator />
    </>
  );
}
