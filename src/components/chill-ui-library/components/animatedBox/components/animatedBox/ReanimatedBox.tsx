import { ReanimatedView } from '../../../box/components/View';
import { ReanimateddBoxProps } from '../../../../types/reanimatedBox.types';

/**
 * The `<ReanimatedBox />` component provides a base animated container with optimal performance.
 * Uses React Native's internal ViewNativeComponent.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { ReanimatedBox } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <ReanimatedBox className="bg-blue-500 p-4 rounded-lg shadow-lg" style={{ transform: [{ translateY: refValue }] }}>
 *   <String className="text-white">Base animated container</String>
 * </ReanimatedBox>
 *
 * ```
 * @param useFastView - Use optimized RCTView component for better performance (default: `true`)
 * @param className - CSS classes for NativeWind styling
 * @param AnimatedViewProps - Any other props accepted by the native `Animated.View` component
 */
export function ReanimatedBox(props: ReanimateddBoxProps) {
  return <ReanimatedView {...props} />;
}

ReanimatedBox.displayName = 'ReanimatedBox';
