import type { PropsWithChildren } from 'react';

import type { WrapperProps } from '../../../types';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { wrapperTv } from '../styles/Wrapper.styles';
import { WrapperSafeAreaView } from './WrapperSafeAreaView';

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
 * @param edges - Safe area edges to apply when hasSafeArea is true: `'top'` | `'right'` | `'bottom'` | `'left'`
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param hasSafeArea - Whether to wrap content in SafeAreaView
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'`
 * @param ViewProps - Any other props accepted by the native `View` component.
 */
export function Wrapper(props: PropsWithChildren<WrapperProps>) {
  const { children, className, edges, fill, grow, hasSafeArea, px, ...rest } = props;

  const content = (
    <Box className={cn(wrapperTv({ fill, grow, px }), className)} {...rest}>
      {children}
    </Box>
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

Wrapper.displayName = 'Wrapper';
