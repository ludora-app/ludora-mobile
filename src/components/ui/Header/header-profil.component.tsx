import React from 'react';
import { Box, Button, Icon } from '@/components/chillUI';

import HeaderTitle from './Header.title.component';

export default function HeaderProfil() {
  return (
    <Box className="flex-row items-center justify-between">
      <HeaderTitle title="Mon profile" />
      <Box className="flex-row items-center gap-4">
        <Button variant="icon" btnClassName="size-10 rounded-full">
          <Icon variant="gear-regular" />
        </Button>
      </Box>
    </Box>
  );
}
