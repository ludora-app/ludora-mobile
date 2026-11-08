import React from 'react';
import { cn, Separator as SeparatorChillUi, SeparatorContent, SeparatorDivider } from '@chillui/ui';

import { String } from '../string';
import { SeparatorProps } from '../../types';

export const Separator = (props: SeparatorProps) => {
  const { className, deviderClassName, title, titleProps } = props;

  return (
    <SeparatorChillUi className={cn('gap-3', className)}>
      <SeparatorDivider className={cn('bg-input', deviderClassName)} />
      {!!title && (
        <SeparatorContent>
          <String variant="body-sm" className="text-dark/75" {...titleProps}>
            {title}
          </String>
        </SeparatorContent>
      )}
    </SeparatorChillUi>
  );
};
