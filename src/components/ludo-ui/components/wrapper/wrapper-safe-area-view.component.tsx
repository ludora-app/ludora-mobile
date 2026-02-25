import { cn, WrapperSafeAreaView } from '@chillui/ui'

import { IS_ANDROID } from '@/constants/platform.constants';

import { WrapperSafeAreaProps } from '../../types/wrapper-safe-area.types';

export default function WrapperSafeArea(props: WrapperSafeAreaProps) {
  const { androidSafeAreaBottom = true, children, ...rest } = props;

  const hasAndroidSafeAreaBottom = androidSafeAreaBottom && IS_ANDROID;
  return (
    <WrapperSafeAreaView className={cn(hasAndroidSafeAreaBottom && 'pb-5')} {...rest}>
      {children}
    </WrapperSafeAreaView>
  )
}