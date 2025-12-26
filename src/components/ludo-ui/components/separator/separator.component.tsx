import React from 'react';
import { cn, Separator as SeparatorChillUi, SeparatorContent, SeparatorDivider } from '@chillui/ui';

import { String } from '../string';
import { SeparatorProps } from '../../types';

export default function Separator(props: SeparatorProps) {
  const { className, deviderClassName, title } = props;

  return (
    <SeparatorChillUi className={cn('gap-2', className)}>
      <SeparatorDivider className={cn('bg-[#D8DADC]', deviderClassName)} />
      {!!title && (
        <SeparatorContent>
          <String>{title}</String>
        </SeparatorContent>
      )}
    </SeparatorChillUi>
  );
}
