import { cn, WrapperKeyboardAwareScrollView as WrapperKeyboardAwareScrollViewChillUi } from '@chillui/ui';

import { IS_ANDROID } from '@/constants/PLATFORM';

import { WrapperKeyboardAwareScrollViewProps } from '../../types/wrapper-keyboard-aware-scroll-view.types';

export default function WrapperKeyboardAwareScrollView(props: WrapperKeyboardAwareScrollViewProps) {
  const { androidSafeAreaBottom = true, children, contentContainerClassName, ...rest } = props;

  const hasAndroidSafeAreaBottom = androidSafeAreaBottom && IS_ANDROID;

  return (
    <WrapperKeyboardAwareScrollViewChillUi
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerClassName={cn(hasAndroidSafeAreaBottom && 'pb-5', contentContainerClassName)}
      {...rest}
    >
      {children}
    </WrapperKeyboardAwareScrollViewChillUi>
  );
}
