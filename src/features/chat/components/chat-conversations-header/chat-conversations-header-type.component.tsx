import { Image, String } from '@ludo/ui';
import { StyleSheet } from 'react-native';
import { allChatsImg, allMatchesImg, allPlayersImg } from 'assets';
import Animated, { useAnimatedStyle, interpolate, Extrapolation, SharedValue } from 'react-native-reanimated';
import {
  Box,
  SegmentedControl,
  SegmentedControlIndicator,
  SegmentedControlTrigger,
  SegmentedControlTriggerContent,
} from '@chillui/ui';

import { ConversationsFindAllByUserUidParams } from '@/api/generated/model';

import { useChatStore } from '../../store/chat.store';

const styles = StyleSheet.create({
  shadow: {
    boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.1)',
  },
});

const SCROLL_DISTANCE = 100;

type ChatConversationsListHeaderTypeProps = {
  scrollY: SharedValue<number>;
};

export default function ChatConversationsListHeaderType({ scrollY }: ChatConversationsListHeaderTypeProps) {
  const setFilters = useChatStore(state => state.setFilters);

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, SCROLL_DISTANCE], [40, 0], Extrapolation.CLAMP);
    const opacity = interpolate(scrollY.value, [0, SCROLL_DISTANCE], [1, 0], Extrapolation.CLAMP);
    const width = interpolate(scrollY.value, [0, SCROLL_DISTANCE], [50, 0], Extrapolation.CLAMP);

    return {
      height,
      opacity,
      overflow: 'hidden',
      width,
    };
  });

  const handlePressType = (type: ConversationsFindAllByUserUidParams['type']) => {
    setFilters({ type });
  };

  return (
    <Box className="rounded-b-xl py-3 bg-background" style={styles.shadow}>
      <SegmentedControl>
        <SegmentedControlTriggerContent className="border-0">
          <SegmentedControlTrigger value="option1" as="scale-pressable" onPress={() => handlePressType(undefined)}>
            <Animated.View style={iconAnimatedStyle}>
              <Image source={allChatsImg} className="size-full" contentFit="contain" />
            </Animated.View>
            <Box>
              <String variant="body-sm">Tous</String>
            </Box>
          </SegmentedControlTrigger>

          <SegmentedControlTrigger value="option2" as="scale-pressable" onPress={() => handlePressType('SESSION')}>
            <Animated.View style={iconAnimatedStyle}>
              <Image source={allMatchesImg} className="size-full" contentFit="contain" />
            </Animated.View>
            <String variant="body-sm">Matchs</String>
          </SegmentedControlTrigger>
          <SegmentedControlTrigger value="option3" as="scale-pressable" onPress={() => handlePressType('PRIVATE')}>
            <Animated.View style={iconAnimatedStyle}>
              <Image source={allPlayersImg} className="size-full" contentFit="contain" />
            </Animated.View>
            <String variant="body-sm">Joueurs</String>
          </SegmentedControlTrigger>
          <SegmentedControlIndicator className="border-primary mt-2 rounded-full border-b-4 bg-transparent" />
        </SegmentedControlTriggerContent>
      </SegmentedControl>
    </Box>
  );
}
