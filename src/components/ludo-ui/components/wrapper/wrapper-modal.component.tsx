import { cn } from '@chillui/ui';
import { PropsWithChildren } from 'react';
import { WrapperSafeAreaView, Box } from '@ludo/ui';

import { IS_IOS } from '@/constants/PLATFORM';

import { WrapperModalProps } from '../../types/wrapper-modal.types';

export default function WrapperModal(props: PropsWithChildren<WrapperModalProps>) {
  const { children, className } = props;

  if (IS_IOS) {
    return (
      <WrapperSafeAreaView px="none" edges={['bottom']}>
        {children}
      </WrapperSafeAreaView>
    );
  }
  return (
    <WrapperSafeAreaView px="none" className="pt-10">
      <Box className={cn('flex-1 rounded-lg bg-background', className)}>{children}</Box>
    </WrapperSafeAreaView>
  );
}
