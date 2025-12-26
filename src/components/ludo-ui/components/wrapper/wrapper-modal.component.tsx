import { PropsWithChildren } from 'react';
import { cn, WrapperSafeAreaView, Wrapper } from '@chillui/ui';

import { IS_IOS } from '@/constants/PLATFORM';

import { WrapperModalProps } from '../../types/wrapper-modal.types';

export default function WrapperModal(props: PropsWithChildren<WrapperModalProps>) {
  const { children, className } = props;

  if (IS_IOS) {
    return children;
  }
  return (
    <WrapperSafeAreaView px="none" className="pt-10">
      <Wrapper className={cn('flex-1 rounded-lg bg-background', className)}>{children}</Wrapper>
    </WrapperSafeAreaView>
  );
}
