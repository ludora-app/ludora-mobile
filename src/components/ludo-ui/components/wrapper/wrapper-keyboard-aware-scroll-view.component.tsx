import { useTranslate } from '@tolgee/react';
import { KeyboardToolbar } from 'react-native-keyboard-controller';
import { cn, WrapperKeyboardAwareScrollView as WrapperKeyboardAwareScrollViewChillUi } from '@chillui/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';

import { WrapperKeyboardAwareScrollViewProps } from '../../types/wrapper-keyboard-aware-scroll-view.types';

export default function WrapperKeyboardAwareScrollView(props: WrapperKeyboardAwareScrollViewProps) {
  const {
    androidSafeAreaBottom = true,
    children, contentContainerClassName,
    hasKeyboardToolbar = false,
    keyboardToolbarProps,
    ...rest } = props;
  const { t } = useTranslate();
  const insets = useSafeArea();

  const hasAndroidSafeAreaBottom = androidSafeAreaBottom && IS_ANDROID;

  return (
    <>
      <WrapperKeyboardAwareScrollViewChillUi
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerClassName={cn(hasAndroidSafeAreaBottom && 'pb-5', contentContainerClassName)}
        {...rest}
      >
        {children}
      </WrapperKeyboardAwareScrollViewChillUi>
      {hasKeyboardToolbar && (
        <KeyboardToolbar
          doneText={t('common.finish')}
          insets={insets}
          {...keyboardToolbarProps}
        />
      )}
    </>
  );
}
