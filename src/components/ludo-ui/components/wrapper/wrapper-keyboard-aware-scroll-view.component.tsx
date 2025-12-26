import { cn, WrapperKeyboardAwareScrollView as WrapperKeyboardAwareScrollViewChillUi } from '@chillui/ui';

import { WrapperKeyboardAwareScrollViewProps } from '../../types/wrapper-keyboard-aware-scroll-view.types';

export default function WrapperKeyboardAwareScrollView(props: WrapperKeyboardAwareScrollViewProps) {
  const { androidSafeAreaBottom = true, children, ...rest } = props;
  return (
    <WrapperKeyboardAwareScrollViewChillUi
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerClassName={cn('flex-grow', androidSafeAreaBottom && 'pb-5')}
      {...rest}
    >
      {children}
    </WrapperKeyboardAwareScrollViewChillUi>
  );
}
