import { useTranslate } from '@tolgee/react';
import { KeyboardToolbar } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WrapperKeyboardAwareScrollView as WrapperKeyboardAwareScrollViewChillUi } from '@chillui/ui';

import { WrapperKeyboardAwareScrollViewProps } from '../../types/wrapper-keyboard-aware-scroll-view.types';
// Mirrors KEYBOARD_TOOLBAR_HEIGHT from react-native-keyboard-controller, which the package doesn't export
const KEYBOARD_TOOLBAR_HEIGHT = 42;
// Space kept between the focused input and the keyboard (or the toolbar above it)
const DEFAULT_BOTTOM_OFFSET = 20;

export const WrapperKeyboardAwareScrollView = (props: WrapperKeyboardAwareScrollViewProps) => {
  const {
    bottomOffset = DEFAULT_BOTTOM_OFFSET,
    children,
    hasKeyboardToolbar = false,
    keyboardToolbarProps,
    ...rest
  } = props;
  const { t } = useTranslate();
  const insets = useSafeAreaInsets();

  const toolbarHeight = hasKeyboardToolbar ? KEYBOARD_TOOLBAR_HEIGHT : 0;

  return (
    <>
      <WrapperKeyboardAwareScrollViewChillUi
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
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
