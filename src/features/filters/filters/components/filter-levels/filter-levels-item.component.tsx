import { useEffect } from 'react';
import { Pressable } from 'react-native';
import { BounceBox, cn } from '@chillui/ui';
import { Box, Icon, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { SESSION_LEVEL_TYPE } from '@/constants/session.constants';

import { useFiltersStore, selectFilters } from '../../store/filters.store';

type CreateSessionStep1Part2LevelItemProps = {
  difficulty: SESSION_LEVEL_TYPE;
};

const LEVEL_ICON_SIZE_SELECTED = 80;
const LEVEL_ICON_SIZE_UNSELECTED = 50;

export default function FilterLevelsItem(props: CreateSessionStep1Part2LevelItemProps) {
  const { t } = useTranslate();
  const { difficulty } = props;

  const selectedLevels = useFiltersStore(state => selectFilters(state)?.levels);
  const setFilters = useFiltersStore(state => state.setFilters);

  const isSelectedLevel = selectedLevels?.includes(difficulty.code);

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

  const handleSelect = () => {
    if (isSelectedLevel) {
      setFilters(prev => ({ levels: prev.levels?.filter(selectedGameLevel => selectedGameLevel !== difficulty.code) }));
      return;
    }
    setFilters(prev => ({ levels: [...(prev.levels ?? []), difficulty.code] }));
  };

  return (
    <Pressable key={difficulty.code} className="items-center gap-1" onPress={handleSelect}>
      <Box style={{ height: LEVEL_ICON_SIZE_SELECTED, width: LEVEL_ICON_SIZE_SELECTED }} className="items-center justify-end">
        <BounceBox autoStart infiniteLoop bounceInterval={1500} duration={1500} bounceHeight={5} style={animatedStyle}>
          <Icon name={difficulty.icon} className="size-full" />
        </BounceBox>
      </Box>
      <Box className={cn('h-2 w-full rounded-full bg-[#D9D9D9]', isSelectedLevel && 'bg-[#69B42E]')} />
      <String position="center" size="xs">
        {t(`common.session_level_${difficulty.code}`, '')}
      </String>
    </Pressable>
  );
}
