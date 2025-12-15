import type { PropsWithChildren } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import type { WrapperSafeAreaViewProps } from '../../../types';

import { cn } from '../../../utils';
import { wrapperTv } from '../styles/Wrapper.styles';

/**
 * SafeAreaView wrapper component for handling safe areas.
 *
 * @example
 * ```tsx
 * <WrapperSafeAreaView edges={['top', 'bottom']}>
 *   <String>Safe area content</String>
 * </WrapperSafeAreaView>
 * ```
 * @param className - Custom CSS classes for the wrapper (NativeWind only)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Padding for the wrapper
 * @param edges - Safe area edges to apply
 * @param emulateUnlessSupported - Whether to emulate unless supported
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function WrapperSafeAreaView(props: PropsWithChildren<WrapperSafeAreaViewProps>) {
  const { children, className, fill, grow, px, ...rest } = props;

  return (
    <SafeAreaView className={cn(wrapperTv({ fill, grow, px }), className)} {...rest}>
      {children}
    </SafeAreaView>
  );
}

WrapperSafeAreaView.displayName = 'WrapperSafeAreaView';
