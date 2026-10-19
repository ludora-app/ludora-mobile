import { useTranslate } from '@tolgee/react';
import { KeyboardToolbar } from 'react-native-keyboard-controller';
import { cn, WrapperKeyboardAwareScrollView as WrapperKeyboardAwareScrollViewChillUi } from '@chillui/ui';

import { useSafeArea } from '@/hooks/safe-area.hook';
import { IS_ANDROID } from '@/constants/platform.constants';

import { WrapperKeyboardAwareScrollViewProps } from '../../types/wrapper-keyboard-aware-scroll-view.types';

// Mirrors KEYBOARD_TOOLBAR_HEIGHT from react-native-keyboard-controller, which the package doesn't export
const KEYBOARD_TOOLBAR_HEIGHT = 42;
const DEFAULT_BOTTOM_OFFSET = 20;

export const WrapperKeyboardAwareScrollView = (props: WrapperKeyboardAwareScrollViewProps) => {
  const {
    androidSafeAreaBottom = true,
    bottomOffset = DEFAULT_BOTTOM_OFFSET,
    children,
    contentContainerClassName,
    hasKeyboardToolbar = false,
    keyboardToolbarProps,
    ...rest
  } = props;
  const { t } = useTranslate();
  const insets = useSafeArea();

  const hasAndroidSafeAreaBottom = androidSafeAreaBottom && IS_ANDROID;

  const toolbarHeight = hasKeyboardToolbar ? KEYBOARD_TOOLBAR_HEIGHT : 0;

  return (
    <>
      <WrapperKeyboardAwareScrollViewChillUi
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerClassName={cn(hasAndroidSafeAreaBottom && 'pb-5', contentContainerClassName)}
        extraKeyboardSpace={toolbarHeight}
        {...rest}
        bottomOffset={bottomOffset + toolbarHeight}
      >
        {children}
      </WrapperKeyboardAwareScrollViewChillUi>
      {hasKeyboardToolbar && (
        <KeyboardToolbar insets={insets} {...keyboardToolbarProps}>
          <KeyboardToolbar.Prev />
          <KeyboardToolbar.Next />
          <KeyboardToolbar.Done text={t('common.finish')} />
        </KeyboardToolbar>
      )}
    </>
  );
};
