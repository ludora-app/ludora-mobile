import React from 'react';
import { useRouter } from 'expo-router';

import { Box, Icon } from '../chillUI';

export default function GoBackHeader() {
  const router = useRouter();
  return (
    <Box className="flex-row items-center justify-between p-1">
      <Icon variant="arrow-left-solid" wrapper onPress={() => router.back()} />
    </Box>
  );
}
