import type { PropsWithChildren } from 'react';

import type { WrapperSafeAreaViewProps } from '../../../types';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { wrapperDefaultProps } from '../utils/defaultProps';
import { wrapperTv, getSafeAreaVariants } from '../styles/Wrapper.styles';

/**
 * SafeAreaView wrapper component for handling safe areas using the app's custom store.
 *
 * @example
 * ```tsx
 * <WrapperSafeAreaView safeArea={['top', 'bottom']}>
 *   <String>Safe area content</String>
 * </WrapperSafeAreaView>
 * ```
 */
export function WrapperSafeAreaView(props: PropsWithChildren<WrapperSafeAreaViewProps>) {
  const {
    children,
    className,
    fill = wrapperDefaultProps.fill,
    grow,
    px,
    safeArea = ['top', 'bottom'],
    style,
    ...rest
  } = props;

  return (
    <Box
      className={cn(wrapperTv({ fill, grow, px, ...getSafeAreaVariants(safeArea) }), className)}
      style={[style]}
      {...rest}
    >
      {children}
    </Box>
  );
}

WrapperSafeAreaView.displayName = 'WrapperSafeAreaView';
