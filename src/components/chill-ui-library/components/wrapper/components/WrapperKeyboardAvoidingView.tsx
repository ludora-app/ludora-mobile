import type { PropsWithChildren } from 'react';

import { withUniwind } from 'uniwind';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';

import type { WrapperKeyboardAvoidingViewProps } from '../../../types';

import { Wrapper } from './Wrapper';
import { cn } from '../../../utils';
import { wrapperTv } from '../styles/Wrapper.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { WrapperSafeAreaView } from './WrapperSafeAreaView';

/**
 * KeyboardAvoidingView wrapper component for keyboard avoidance.
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAvoidingView behavior="padding">
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 *
 * // With SafeAreaView
 * <WrapperKeyboardAvoidingView hasSafeArea edges={['top', 'bottom']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param edges - Safe area edges to apply when hasSafeArea is true
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
    edges,
    fill,
    grow,
    hasSafeArea,
    keyboardVerticalOffset = wrapperDefaultProps.keyboardVerticalOffset,
    px,
    ...rest
  } = props;

  if (!KeyboardAvoidingView) {
    return (
      <Wrapper
        className={cn(wrapperTv({ fill, grow, px }), className)}
        hasSafeArea={hasSafeArea}
        edges={edges}
        {...rest}
      >
        {children}
      </Wrapper>
    );
  }

  const content = (
    <StyledKeyboardAvoidingView
      className={cn(wrapperTv({ fill, grow, px }), className)}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled
      {...rest}
    >
      {children}
    </StyledKeyboardAvoidingView>
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

WrapperKeyboardAvoidingView.displayName = 'WrapperKeyboardAvoidingView';
