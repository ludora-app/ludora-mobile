import React from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Icon } from '../chillUI';

export default function GoBackHeader() {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  return (
    <Box className="flex-row items-center justify-between p-1" style={{ paddingTop: top }}>
      <Icon variant="arrow-left-solid" wrapper onPress={() => router.back()} />
    </Box>
  );
}
