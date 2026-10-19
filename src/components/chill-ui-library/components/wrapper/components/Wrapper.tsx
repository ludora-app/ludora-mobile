import type { PropsWithChildren } from 'react';

import type { WrapperProps } from '../../../types';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { wrapperTv, getSafeAreaVariants } from '../styles/Wrapper.styles';

/**
 * The `<Wrapper />` component provides a flexible container with default styling and SafeAreaView support.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { Wrapper } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <Wrapper className="bg-gray-100 p-4">
 *   <String>Content</String>
 * </Wrapper>
 * ```
 *
 * @param className - Custom CSS classes for the wrapper (NativeWind)
 * @param safeArea - Safe area paddings: `'top'` | `'right'` | `'bottom'` | `'left'`, or with a spacing offset 1–8 (`'bottom-4'`)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function Wrapper(props: PropsWithChildren<WrapperProps>) {
  const { children, className, fill, grow, px, safeArea, ...rest } = props;

  return (
    <Box className={cn(wrapperTv({ fill, grow, px, ...getSafeAreaVariants(safeArea) }), className)} {...rest}>
      {children}
    </Box>
  );
}

Wrapper.displayName = 'Wrapper';
