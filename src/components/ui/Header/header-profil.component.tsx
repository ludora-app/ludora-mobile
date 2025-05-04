import React from 'react';
import { Box, Button, Icon } from '@/components/chillUI';

import HeaderTitle from './Header.title.component';

export default function HeaderProfil() {
  return (
    <Box className="flex-row items-center justify-between">
      <HeaderTitle title="Mon profile" />
      <Button variant="icon" btnClassName="flex-none size-10 rounded-full">
        <Icon variant="gear-regular" />
      </Button>
    </Box>
  );
}
