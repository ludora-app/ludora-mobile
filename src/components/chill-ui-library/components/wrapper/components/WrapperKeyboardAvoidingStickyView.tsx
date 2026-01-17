import type { PropsWithChildren } from 'react';

import { withUniwind } from 'uniwind';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import type { WrapperKeyboardAvoidingStickyViewProps } from '../../../types';

import { Wrapper } from './Wrapper';
import { cn } from '../../../utils';
import { wrapperTv } from '../styles/Wrapper.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView';

/**
 * The `<WrapperKeyboardAvoidingStickyView />` component provides a KeyboardStickyView wrapper for keyboard avoidance with sticky behavior.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { WrapperKeyboardAvoidingStickyView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAvoidingStickyView offset={{ close: 0, open: 20 }}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAvoidingStickyView>
 * ```
 *
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param offset - Offset for the keyboard avoiding sticky view: `{ close: number; open: number }`
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */

const StyledKeyboardStickyView = withUniwind(KeyboardStickyView);
export function WrapperKeyboardAvoidingStickyView(props: PropsWithChildren<WrapperKeyboardAvoidingStickyViewProps>) {
  const { children, className, edges, fill, grow, hasSafeArea, px, style, ...rest } = props;

  if (!KeyboardStickyView) {
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
    <StyledKeyboardStickyView className={cn(wrapperTv({ fill, grow, px }), className)} {...rest}>
      {children}
    </StyledKeyboardStickyView>
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

WrapperKeyboardAvoidingStickyView.displayName = 'WrapperKeyboardAvoidingStickyView';
