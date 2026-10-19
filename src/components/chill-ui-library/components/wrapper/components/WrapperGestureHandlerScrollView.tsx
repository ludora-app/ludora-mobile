import type { PropsWithChildren } from 'react';

import { ScrollView } from 'react-native-gesture-handler';

import type { WrapperGestureHandlerScrollViewProps } from '../../../types';

import { cn } from '../../../utils';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { wrapperTv, getSafeAreaVariants } from '../styles/Wrapper.styles';

/**
 * The `<WrapperScrollView />` component provides a ScrollView wrapper.
 *
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { WrapperScrollView } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <WrapperScrollView contentContainerClassName="p-4">
 *   <String>Scrollable content</String>
 * </WrapperScrollView>
 * ```
 *
 * @param contentContainerClassName - Custom CSS classes for the content container (nativewind only)
 * @param safeArea - Safe area paddings on the content container: `'top'` | `'right'` | `'bottom'` | `'left'`, or with a spacing offset 1–8 (`'bottom-4'`)
 * @param fill - Whether to fill the wrapper
 * @param grow - Whether to grow the wrapper
 * @param px - Horizontal padding variant: `'none'` | `'xs'` | `'sm'` | `'md'` | `'lg'` | `'xl'` | `'2xl'` | `'3xl'`
 * @param ScrollViewProps - Any other props accepted by the native `ScrollView` component.
 */
export function WrapperGestureHandlerScrollView(props: PropsWithChildren<WrapperGestureHandlerScrollViewProps>) {
  const { children, contentContainerClassName, fill, grow, px, ref, safeArea, ...rest } = props;

  return (
    <ScrollView
      ref={ref}
      contentContainerClassName={cn(
        wrapperTv({ fill, grow, px, ...getSafeAreaVariants(safeArea) }),
        contentContainerClassName,
      )}
      alwaysBounceVertical={wrapperDefaultProps.alwaysBounceVertical}
      showsVerticalScrollIndicator={wrapperDefaultProps.showsVerticalScrollIndicator}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}

WrapperGestureHandlerScrollView.displayName = 'WrapperGestureHandlerScrollView';
