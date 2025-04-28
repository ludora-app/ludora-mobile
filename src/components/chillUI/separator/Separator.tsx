import React from 'react';

import cn from '../cn/cn';
import { Box } from '../box';
import { SeparatorProps } from '../utils/types';
import String from '../string/components/String';

export default function Separator({ className, title }: SeparatorProps) {
  return title ? (
    <Box className={cn('flex-row items-center gap-2', className)}>
      <Box className="h-0.5 flex-1 bg-ring" />
      <String weight="semiBold" variant="ring" className="mb-1">
        {title}
      </String>
      <Box className="h-0.5 flex-1 bg-ring" />
    </Box>
  ) : (
    <Box className={cn('h-0.5 w-full bg-ring', className)} />
  );
}
