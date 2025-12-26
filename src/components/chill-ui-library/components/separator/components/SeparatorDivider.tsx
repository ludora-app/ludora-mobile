import React from 'react';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { twStyles } from '../styles/Separator.styles';
import { SeparatorDividerProps } from '../../../types';

export default function SeparatorDivider(props: SeparatorDividerProps) {
  const { className, ...rest } = props;
  return <Box className={cn(twStyles.separator, className)} {...rest} />;
}

SeparatorDivider.displayName = 'SeparatorDivider';
