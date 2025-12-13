import Animated from 'react-native-reanimated';

/**
 * Props for the basic AnimatedBox component.
 *
 * This is the base animated container component that extends AnimatedViewProps
 * without adding any additional animation-specific properties.
 * ```
 */

export type ReanimatedViewProps = React.ComponentProps<typeof Animated.View>;

export interface ReanimateddBoxProps extends ReanimatedViewProps {
  /** Use optimized RCTView component for better performance  */
  useFastView?: boolean;
}
