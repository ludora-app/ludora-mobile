import type { ViewProps as NativeViewProps } from 'react-native';

import { withUniwind } from 'uniwind';
import { View as NativeView } from 'react-native';
import { ReactElement, createElement } from 'react';

/**
 * Props for View components that include className support
 */
interface ViewProps extends NativeViewProps {
  className?: string;
  useFastView?: boolean;
}

function FastView(props: NativeViewProps): ReactElement {
  return createElement('RCTView', props);
}

const StyledFastView = withUniwind(FastView);

/**
 * View component that provides a high-performance view container.
 * Automatically detects NativeWind availability and falls back to StyleSheet if needed.
 *
 * @example
 * ```tsx
 * // With NativeWind
 * <View className="p-4 bg-gray-100">
 *   <String>Content</String>
 * </View>
 *
 * // Without NativeWind (fallback)
 * <View style={{ padding: 16, backgroundColor: '#f3f4f6' }}>
 *   <String>Content</String>
 * </View>
 * ```
 */
export function View(props: ViewProps) {
  const { children, useFastView = true, ...rest } = props;

  if (useFastView) {
    return <StyledFastView {...rest}>{children}</StyledFastView>;
  }

  return <NativeView {...rest}>{children}</NativeView>;
}
