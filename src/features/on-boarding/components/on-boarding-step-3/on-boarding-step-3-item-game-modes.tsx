import { Chip } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';

import { useOnBoardingStore } from '../../stores/on-boarding.store';

interface OnBoardingStep3ItemGameModesProps {
  sport: string;
  gameMode: CreateSessionFromRequestDtoGameMode;
}

export default function OnBoardingStep3ItemGameModes(props: OnBoardingStep3ItemGameModesProps) {
  const { gameMode, sport } = props;
  const { t } = useTranslate();
  const addGameMode = useOnBoardingStore(state => state.addGameMode);
  const isSelected = useOnBoardingStore(state =>
    state.sportPreferences.find(p => p.sport === sport)?.gameModes?.includes(gameMode),
  );

  const handlePress = () => {
    addGameMode(sport, gameMode);
  };

  return (
    <Chip
      title={t(`common.game_mode_${gameMode}`, { space: ' ' })}
      onPress={handlePress}
      variant="outlined"
      colorVariant={isSelected ? 'primary' : 'muted'}
      className="bg-white"
    />
  );
}
