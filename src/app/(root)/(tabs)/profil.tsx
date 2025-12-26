import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/ludo-ui';
import { useAuthHelpers } from '@/hooks/auth-helpers.hook';

export default function Profil() {
  const { logout } = useAuthHelpers();
  return (
    <View className="mt-36">
      <Button title="Se déconnecter" onPress={logout} />
    </View>
  );
}
