import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { BounceBox, cn } from '@/components/chill-ui-library';
import { SESSION_LEVEL_TYPE } from '@/constants/session.constants';

import { useCreateSessionStore } from '../../../../store/create-session.store';

type CreateSessionStep1Part2LevelItemProps = {
  difficulty: SESSION_LEVEL_TYPE;
};

const LEVEL_ICON_SIZE_SELECTED = 80;
const LEVEL_ICON_SIZE_UNSELECTED = 50;

export default function CreateSessionStep1Part2Item(props: CreateSessionStep1Part2LevelItemProps) {
  const { t } = useTranslate();
  const { difficulty } = props;

  const selectedLevel = useCreateSessionStore(state => state.session?.level);
  const setSession = useCreateSessionStore(state => state.setSession);

  const isSelectedLevel = selectedLevel === difficulty.code;

  const animatedWidth = useSharedValue(isSelectedLevel ? LEVEL_ICON_SIZE_SELECTED : LEVEL_ICON_SIZE_UNSELECTED);

  useEffect(() => {
    animatedWidth.value = withSpring(isSelectedLevel ? LEVEL_ICON_SIZE_SELECTED : LEVEL_ICON_SIZE_UNSELECTED, {
      damping: 15,
      stiffness: 100,
    });
  }, [isSelectedLevel, animatedWidth]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedWidth.value,
    width: animatedWidth.value,
  }));

  return (
    <Pressable
      key={difficulty.code}
      className="items-center gap-1"
      onPress={() => setSession({ level: difficulty.code })}
    >
      <BounceBox autoStart infiniteLoop bounceInterval={1500} duration={1500} bounceHeight={5} style={animatedStyle}>
        <Icon name={difficulty.icon} className="size-full" />
      </BounceBox>
      <Box className={cn('h-2 w-full rounded-full bg-[#D9D9D9]', isSelectedLevel && 'bg-[#69B42E]')} />
      <String position="center" size="xs">
        {t(`create-session-steps.step-1.session_level_${difficulty.name}`)}
      </String>
    </Pressable>
  );
}
