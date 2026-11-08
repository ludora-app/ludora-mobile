import type { PropsWithChildren } from 'react';

import { withUniwind } from 'uniwind';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import type { WrapperKeyboardAvoidingViewProps } from '../../../types';

import { Wrapper } from './Wrapper';
import { cn } from '../../../utils';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { wrapperTv, getSafeAreaVariants } from '../styles/Wrapper.styles';

/**
 * KeyboardAvoidingView wrapper component for keyboard avoidance.
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAvoidingView behavior="padding">
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 *
 * // With safe area paddings
 * <WrapperKeyboardAvoidingView safeArea={['top', 'bottom-4']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param safeArea - Safe area paddings on the view: `'top'` | `'right'` | `'bottom'` | `'left'`, or with a spacing offset 1–8 (`'bottom-4'`)
 * @param keyboardVerticalOffset - Keyboard vertical offset
 * @param behavior - Behavior of the keyboard avoiding view
 * @param enabled - Whether the keyboard avoiding view is enabled
 * @param contentContainerStyle - Content container style (The style of the content container (View) when behavior is position.)
 * @param ViewProps - Any other props accepted by the native `View` component.
 */

const StyledKeyboardAvoidingView = withUniwind(KeyboardAvoidingView);
export function WrapperKeyboardAvoidingView(props: PropsWithChildren<WrapperKeyboardAvoidingViewProps>) {
  const {
    children,
    className,
    fill,
    grow,
    keyboardVerticalOffset = wrapperDefaultProps.keyboardVerticalOffset,
    px,
    safeArea,
    ...rest
  } = props;

  if (!KeyboardAvoidingView) {
    return (
      <Wrapper className={className} fill={fill} grow={grow} px={px} safeArea={safeArea} {...rest}>
        {children}
      </Wrapper>
    );
  }

  return (
    <StyledKeyboardAvoidingView
      className={cn(wrapperTv({ fill, grow, px, ...getSafeAreaVariants(safeArea) }), className)}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled
      {...rest}
    >
      {children}
    </StyledKeyboardAvoidingView>
  );
}

WrapperKeyboardAvoidingView.displayName = 'WrapperKeyboardAvoidingView';
