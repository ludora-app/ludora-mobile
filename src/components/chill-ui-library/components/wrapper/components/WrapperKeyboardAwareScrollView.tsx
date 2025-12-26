import type { PropsWithChildren } from 'react';

import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { cn } from '../../../utils';
import { wrapperTv } from '../styles/Wrapper.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView';
import { WrapperKeyboardAwareScrollViewProps } from '../../../types';

/**
 * KeyboardAwareScrollView wrapper component for better keyboard handling.
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAwareScrollView bottomOffset={20}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAwareScrollView>
 *
 * // With SafeAreaView
 * <WrapperKeyboardAwareScrollView hasSafeArea edges={['top', 'bottom']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAwareScrollView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
 * @param bottomOffset - Bottom offset for keyboard
 * @param disableScrollOnKeyboardHide - Whether to disable scroll on keyboard hide
 * @param enabled - Whether the keyboard aware scroll view is enabled
 * @param extraKeyboardSpace - Extra keyboard space
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function WrapperKeyboardAwareScrollView(props: PropsWithChildren<WrapperKeyboardAwareScrollViewProps>) {
  const {
    bottomOffset = wrapperDefaultProps.bottomOffset,
    children,
    className,
    edges,
    fill,
    grow,
    hasSafeArea,
    px,
    ...rest
  } = props;

  const content = (
    <KeyboardAwareScrollView
      className={cn(wrapperTv({ fill, grow, px }), className)}
      bottomOffset={bottomOffset}
      {...rest}
    >
      {children}
    </KeyboardAwareScrollView>
  );

  if (hasSafeArea) {
    return (
      <WrapperSafeAreaView edges={edges} px="none">
        {content}
      </WrapperSafeAreaView>
    );
  }

  return content;
}

WrapperKeyboardAwareScrollView.displayName = 'WrapperKeyboardAwareScrollView';
