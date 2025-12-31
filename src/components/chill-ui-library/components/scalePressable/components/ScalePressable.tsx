import { forwardRef } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { ScalePressableProps } from '../../../types';
import { scalePressableDefaultProps } from '../utils/defaultProps';

/**
 * The `<ScalePressable />` component provides a scale effect on press.
 * When pressed, the component scales down to give a tactile feedback effect.
 *
 * <!-- STORYBOOK_IMPORT_START
 * ```tsx
 * import { ScalePressable } from 'react-native-chill-ui';
 * ```
 * STORYBOOK_IMPORT_END -->
 *
 * @example
 * ```tsx
 * <ScalePressable onPress={() => console.log('Pressed!')}>
 *   <Box className="p-4 bg-blue-500 rounded-lg">
 *     <String color="white">Press me</String>
 *   </Box>
 * </ScalePressable>
 * ```
 *
 * @param children - Child components to render with scale effect (required)
 * @param className - Custom CSS classes for styling the container (NativeWind)
 * @param style - Style object for the pressable container
 * @param scaleValue - Scale factor when pressed (default: 0.95)
 * @param duration - Animation duration in milliseconds (default: 100)
 * @param onPress - Callback function called when the component is pressed
 * @returns ScalePressable component with scale animation
 * @throws Error if no children are provided
 */

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const ScalePressable = forwardRef<any, React.PropsWithChildren<ScalePressableProps>>((props, ref) => {
  const {
    children,
    className,
    duration = scalePressableDefaultProps.duration,
    onPress,
    pointerEvents = 'auto',
    scaleValue = scalePressableDefaultProps.scaleValue,
    style,
    ...rest
  } = props;

  // 1. On remplace useRef par useSharedValue
  const scale = useSharedValue(1);

  // 2. Définition du style animé (UI Thread)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // 3. Gestionnaires de pression avec withTiming
  const handlePressIn = () => {
    scale.value = withTiming(scaleValue, { duration });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration });
  };

  const handlePress = (event: any) => {
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <AnimatedPressable
      ref={ref}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={className}
      style={[animatedStyle, style]}
      {...rest}
    >
      {children}
    </AnimatedPressable>
  );
});

ScalePressable.displayName = 'ScalePressable';
