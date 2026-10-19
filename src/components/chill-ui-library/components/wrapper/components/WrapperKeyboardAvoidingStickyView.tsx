import type { PropsWithChildren } from 'react';

import { withUniwind } from 'uniwind';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

import type { WrapperKeyboardAvoidingStickyViewProps } from '../../../types';

import { Wrapper } from './Wrapper';
import { cn } from '../../../utils';
import { wrapperTv, getSafeAreaVariants } from '../styles/Wrapper.styles';

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
 * @param safeArea - Safe area paddings on the view: `'top'` | `'right'` | `'bottom'` | `'left'`, or with a spacing offset 1–8 (`'bottom-4'`)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param offset - Offset for the keyboard avoiding sticky view: `{ close: number; open: number }`
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */

const StyledKeyboardStickyView = withUniwind(KeyboardStickyView);
export function WrapperKeyboardAvoidingStickyView(props: PropsWithChildren<WrapperKeyboardAvoidingStickyViewProps>) {
  const { children, className, fill, grow, px, safeArea, style, ...rest } = props;

  if (!KeyboardStickyView) {
    return (
      <Wrapper className={className} fill={fill} grow={grow} px={px} safeArea={safeArea} style={style} {...rest}>
        {children}
      </Wrapper>
    );
  }

  return (
    <StyledKeyboardStickyView
      className={cn(wrapperTv({ fill, grow, px, ...getSafeAreaVariants(safeArea) }), className)}
      style={style}
      {...rest}
    >
      {children}
    </StyledKeyboardStickyView>
  );
}

WrapperKeyboardAvoidingStickyView.displayName = 'WrapperKeyboardAvoidingStickyView';
