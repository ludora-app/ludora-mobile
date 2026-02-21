import type { PropsWithChildren } from 'react';

import { useSafeAreaStore } from '@/stores/safe-area.store';

import type { WrapperSafeAreaViewProps } from '../../../types';

import { Box } from '../../box';
import { cn } from '../../../utils';
import { wrapperTv } from '../styles/Wrapper.styles';
import { wrapperDefaultProps } from '../utils/defaultProps';

/**
 * SafeAreaView wrapper component for handling safe areas using the app's custom store.
 *
 * @example
 * ```tsx
 * <WrapperSafeAreaView edges={['top', 'bottom']}>
 *   <String>Safe area content</String>
 * </WrapperSafeAreaView>
 * ```
 */
export function WrapperSafeAreaView(props: PropsWithChildren<WrapperSafeAreaViewProps>) {
  const {
    children,
    className,
    edges = ['top', 'right', 'bottom', 'left'],
    fill = wrapperDefaultProps.fill,
    grow,
    px,
    style,
    ...rest
  } = props;

  const insets = useSafeAreaStore(state => state.insets);

  const safeAreaStyle = {
    paddingBottom: edges.includes('bottom') ? (insets?.bottom ?? 0) : 0,
    paddingLeft: edges.includes('left') ? (insets?.left ?? 0) : 0,
    paddingRight: edges.includes('right') ? (insets?.right ?? 0) : 0,
    paddingTop: edges.includes('top') ? (insets?.top ?? 0) : 0,
  };

  return (
    <Box
      className={cn(wrapperTv({ fill, grow, px }), className)}
      style={[safeAreaStyle, style]}
      {...rest}
    >
      {children}
    </Box>
  );
}

WrapperSafeAreaView.displayName = 'WrapperSafeAreaView';
