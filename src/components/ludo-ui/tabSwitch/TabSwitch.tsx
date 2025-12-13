import COLORS from '@/constants/COLORS';
import { useState, useRef } from 'react';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Dimensions, FlatList, Pressable, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { cn, Box, String, Icon, AnimatedBox } from '@chillui/ui';

import { TabSwitchProps } from '../utils/types';

type ScreenType = {
  key: 'leftScreen' | 'rightScreen';
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ANIMATION_DURATION = 300;

export default function TabSwitch({
  cardDisplay,
  leftRender,
  leftScreenTitle,
  rightRender,
  rightScreenTitle,
}: TabSwitchProps) {
  const [activeScreen, setActiveScreen] = useState<'leftScreen' | 'rightScreen'>('leftScreen');

  const flatlistRef = useRef<FlatList<ScreenType>>(null);

  const screenType: ScreenType[] = [{ key: 'leftScreen' }, { key: 'rightScreen' }];

  // Shared value for animation
  const translateX = useSharedValue(0);

  const handleTabPress = (index: number) => {
    flatlistRef.current?.scrollToIndex({ animated: true, index });
    // Animation de la barre
    translateX.value = withTiming(index * (SCREEN_WIDTH / 2), {
      duration: ANIMATION_DURATION,
    });
    // Mise à jour de l'onglet actif
    setActiveScreen(screenType[index].key);
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollOffsetX / SCREEN_WIDTH);

    // Met à jour la valeur animée de la barre
    translateX.value = withTiming(currentIndex * (SCREEN_WIDTH / 2), {
      duration: ANIMATION_DURATION,
    });
    // Met à jour l'onglet actif
    setActiveScreen(screenType[currentIndex].key);
  };
  const animatedSeparatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  if (cardDisplay) {
    return (
      <Box className="flex-1">
        {/* Header */}
        <Box className="w-full flex-row gap-2 p-4">
          <Pressable
            className={cn('w-1/2 items-center rounded-lg border border-primary p-4', {
              'bg-primary': activeScreen === 'leftScreen',
            })}
            onPress={() => handleTabPress(0)}
          >
            <Icon
              variant={cardDisplay.leftScreenIcon}
              color={activeScreen === 'leftScreen' ? '#fff' : COLORS.primary}
            />
            <String variant={activeScreen === 'leftScreen' ? 'white' : 'primary'} weight="regular" size="lg">
              {leftScreenTitle}
            </String>
          </Pressable>
          <Pressable
            className={cn('w-1/2 items-center rounded-lg border border-primary p-4', {
              'bg-primary': activeScreen === 'rightScreen',
            })}
            onPress={() => handleTabPress(1)}
          >
            <Icon
              variant={cardDisplay.rightScreenIcon}
              color={activeScreen === 'rightScreen' ? '#fff' : COLORS.primary}
            />
            <String variant={activeScreen === 'rightScreen' ? 'white' : 'primary'} weight="regular" size="lg">
              {rightScreenTitle}
            </String>
          </Pressable>
        </Box>

        {/* Separator */}
        <Box className="relative h-0.5 w-full bg-[#808080]">
          <AnimatedBox style={[animatedSeparatorStyle]}>
            <Box className="h-full w-1/2 bg-primary" />
          </AnimatedBox>
        </Box>

        {/* Content */}
        <FlatList
          className="w-full"
          ref={flatlistRef}
          data={screenType}
          keyExtractor={item => item.key}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onMomentumScrollEnd={onMomentumScrollEnd} // Trigger animation during scroll
          scrollEventThrottle={16} // Optimize scroll event handling
          renderItem={({ item }) =>
            item.key === 'leftScreen' ? (
              <Box className="w-screen flex-1">{leftRender}</Box>
            ) : (
              <Box className="w-screen flex-1">{rightRender}</Box>
            )
          }
        />
      </Box>
    );
  }

  return (
    <Box className="w-full flex-1">
      {/* Header */}
      <Box className="w-full flex-row">
        <Pressable className="w-1/2 items-center p-4" onPress={() => handleTabPress(0)}>
          <String variant="primary" weight="bold" size="lg">
            {leftScreenTitle}
          </String>
        </Pressable>
        <Pressable className="w-1/2 items-center p-4" onPress={() => handleTabPress(1)}>
          <String variant="primary" weight="bold" size="lg">
            {rightScreenTitle}
          </String>
        </Pressable>
      </Box>

      {/* Separator */}
      <Box className="relative h-0.5 w-full bg-[#808080]">
        <AnimatedBox style={[animatedSeparatorStyle]}>
          <Box className="h-full w-1/2 bg-primary" />
        </AnimatedBox>
      </Box>

      {/* Content */}
      <FlatList
        className="w-full"
        ref={flatlistRef}
        data={screenType}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onMomentumScrollEnd={onMomentumScrollEnd} // Trigger animation during scroll
        scrollEventThrottle={16} // Optimize scroll event handling
        renderItem={({ item }) =>
          item.key === 'leftScreen' ? (
            <Box className="w-full flex-1">{leftRender}</Box>
          ) : (
            <Box className="w-full flex-1">{rightRender}</Box>
          )
        }
      />
    </Box>
  );
}
