import { cn } from '@chillui/ui';
import { useEffect, useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { scheduleOnRN } from 'react-native-worklets';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { Box } from '../box';
import { String } from '../string';
import { getSliderStopLeft } from './slider.utils';
import { SliderStop } from './slider-stop.component';
import { SliderProps, SliderValue } from '../../types/slider.types';

const THUMB_SIZE = 26;

const SPRING_CONFIG = { damping: 20, stiffness: 220 };

/**
 * Slider snapping on discrete values: the thumb follows the finger and snaps to the closest stop on release.
 * `onChange` fires as soon as the closest stop changes, so the caller can update live while dragging.
 */
export const Slider = <T extends SliderValue>(props: SliderProps<T>) => {
  const { className, getLabel, onChange, value, values } = props;
  const [trackWidth, setTrackWidth] = useState(0);
  const lastIndex = values.length - 1;
  const selectedIndex = Math.max(values.indexOf(value), 0);

  const position = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const width = useSharedValue(0);
  const currentIndex = useSharedValue(selectedIndex);

  useEffect(() => {
    if (isDragging.get()) return;
    currentIndex.set(selectedIndex);
    position.set(withSpring((selectedIndex / lastIndex) * trackWidth, SPRING_CONFIG));
  }, [currentIndex, isDragging, lastIndex, position, selectedIndex, trackWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    setTrackWidth(layoutWidth);
    width.set(layoutWidth);
    // Places the thumb right away instead of springing from the left edge on mount
    if (!isDragging.get()) position.set((currentIndex.get() / lastIndex) * layoutWidth);
  };

  const handleIndexChange = (index: number) => onChange(values[index]);

  const moveTo = (x: number) => {
    'worklet';

    if (width.get() === 0) return;
    position.set(Math.min(Math.max(x, 0), width.get()));
    const index = Math.round((position.get() / width.get()) * lastIndex);
    if (index === currentIndex.get()) return;
    currentIndex.set(index);
    scheduleOnRN(handleIndexChange, index);
  };

  // Pan also handles taps: onBegin fires on touch down and onFinalize on release
  const gesture = Gesture.Pan()
    .onBegin(event => {
      isDragging.set(true);
      moveTo(event.x);
    })
    .onUpdate(event => moveTo(event.x))
    .onFinalize(() => {
      isDragging.set(false);
      position.set(withSpring((currentIndex.get() / lastIndex) * width.get(), SPRING_CONFIG));
    });

  const fillStyle = useAnimatedStyle(() => ({ width: position.get() }));
  const thumbStyle = useAnimatedStyle(() => ({ transform: [{ translateX: position.get() - THUMB_SIZE / 2 }] }));

  const handleAccessibilityAction = (actionName: string) => {
    const nextIndex = actionName === 'increment' ? selectedIndex + 1 : selectedIndex - 1;
    if (nextIndex < 0 || nextIndex > lastIndex) return;
    onChange(values[nextIndex]);
  };

  return (
    <Box
      className={cn('mx-5.5', className)}
      accessible
      accessibilityRole="adjustable"
      accessibilityValue={{ text: getLabel(value) }}
      accessibilityActions={[{ name: 'increment' }, { name: 'decrement' }]}
      onAccessibilityAction={event => handleAccessibilityAction(event.nativeEvent.actionName)}
    >
      <GestureDetector gesture={gesture}>
        <Box className="h-11 justify-center" onLayout={handleLayout} hitSlop={{ left: 22, right: 22 }}>
          <Box className="h-1.5 rounded-full bg-input" />
          <Animated.View className="absolute left-0 h-1.5 rounded-full bg-primary" style={fillStyle} />
          {values.map((stopValue, index) => (
            <SliderStop key={stopValue} index={index} lastIndex={lastIndex} position={position} width={width} />
          ))}
          <Animated.View
            className="absolute left-0 rounded-full bg-primary shadow-md"
            style={[{ height: THUMB_SIZE, width: THUMB_SIZE }, thumbStyle]}
          />
        </Box>
      </GestureDetector>
      <Box className="h-4.5">
        {values.map((stopValue, index) => (
          <String
            key={stopValue}
            variant="body-xs"
            font={index === selectedIndex ? 'primaryExtraBold' : 'primarySemiBold'}
            colorVariant="muted"
            className="absolute -ml-5.5 w-11 text-center"
            style={{ left: getSliderStopLeft(index, lastIndex) }}
          >
            {getLabel(stopValue)}
          </String>
        ))}
      </Box>
    </Box>
  );
};
