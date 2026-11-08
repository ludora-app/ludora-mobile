import type { PropsWithChildren } from 'react';

import { withUniwind } from 'uniwind';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

import { cn } from '../../../utils';
import { WrapperKeyboardAwareScrollViewProps } from '../../../types';
import { wrapperTv, getSafeAreaVariants } from '../styles/Wrapper.styles';

/**
 * KeyboardAwareScrollView wrapper component for better keyboard handling.
 *
 * @example
 * ```tsx
 * <WrapperKeyboardAwareScrollView bottomOffset={20}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAwareScrollView>
 *
 * // With safe area paddings on the content
 * <WrapperKeyboardAwareScrollView safeArea={['top', 'bottom-4']}>
 *   <Input placeholder="Type here" />
 * </WrapperKeyboardAwareScrollView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param safeArea - Safe area paddings on the content container: `'top'` | `'right'` | `'bottom'` | `'left'`, or with a spacing offset 1–8 (`'bottom-4'`)
 * @param bottomOffset - Bottom offset for keyboard
 * @param disableScrollOnKeyboardHide - Whether to disable scroll on keyboard hide
 * @param enabled - Whether the keyboard aware scroll view is enabled
 * @param extraKeyboardSpace - Extra keyboard space
 * @param ViewProps - Any other props accepted by the native `View` component.
 */

const StyledKeyboardAwareScrollView = withUniwind(KeyboardAwareScrollView);
export function WrapperKeyboardAwareScrollView(props: PropsWithChildren<WrapperKeyboardAwareScrollViewProps>) {
  const { children, contentContainerClassName, fill, grow, px, safeArea, ...rest } = props;

  return (
    <StyledKeyboardAwareScrollView
      contentContainerClassName={cn(
        wrapperTv({ fill, grow, px, ...getSafeAreaVariants(safeArea) }),
        contentContainerClassName,
      )}
      {...rest}
    >
      {children}
    </StyledKeyboardAwareScrollView>
  );
}

WrapperKeyboardAwareScrollView.displayName = 'WrapperKeyboardAwareScrollView';
