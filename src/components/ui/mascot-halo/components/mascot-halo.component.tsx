import { useEffect } from 'react';
import { Box, Icon } from '@ludo/ui';
import { VariantProps } from 'tailwind-variants';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { TIconsAll } from '@/constants/icons.constants';

import { mascotHaloTv } from './mascot-halo.styles';

const BOB_DURATION_MS = 1_400;
const BOB_OFFSET = -8;

export type MascotHaloProps = {
  className?: string;
  iconClassName?: string;
  isAnimated?: boolean;
  name: TIconsAll;
  size?: VariantProps<typeof mascotHaloTv>['size'];
};

/** Mascot on a light yellow disc, optionally floating up and down. */
export const MascotHalo = (props: MascotHaloProps) => {
  const { className, iconClassName, isAnimated = false, name, size } = props;
  const { container, halo, icon } = mascotHaloTv({ size });
  const translateY = useSharedValue(0);

  useEffect(() => {
    if (!isAnimated) return;
    const timing = { duration: BOB_DURATION_MS, easing: Easing.inOut(Easing.ease) };
    translateY.value = withRepeat(withSequence(withTiming(BOB_OFFSET, timing), withTiming(0, timing)), -1);
  }, [isAnimated, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  return (
    <Box className={container({ className })}>
      <Box className={halo()} />
      <Animated.View style={animatedStyle}>
        <Icon name={name} className={icon({ className: iconClassName })} />
      </Animated.View>
    </Box>
  );
};
