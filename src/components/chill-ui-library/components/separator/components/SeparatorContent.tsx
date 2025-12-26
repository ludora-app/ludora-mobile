import { PropsWithChildren } from 'react';

import { Box } from '../../box';
import { SeparatorContentProps } from '../../../types';

export default function SeparatorContent(props: PropsWithChildren<SeparatorContentProps>) {
  const { children, position, ...rest } = props;
  return <Box {...rest}>{children}</Box>;
}

SeparatorContent.displayName = 'SeparatorContent';
