import { Box } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useGetSportGameModes } from '@/queries/get-sports.query';
import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';

import { useCreateSessionStore } from '../../../../store/create-session.store';
import CreateSessionSubtitle from '../../../create-session-subtitle-component';
import CreateSessionStep1Part3Item from './create-session-step-1-part-3-item.component';

export default function CreateSessionStep1Part3() {
  const { t } = useTranslate();
  const selectedSport = useCreateSessionStore(state => state.session?.sport);
  const sportGameModes = useGetSportGameModes(selectedSport);

  return (
    <Animated.View entering={FadeIn}>
      <CreateSessionSubtitle title={t('create-session-steps.step-1.select_game_mode_title')} />
      <Box className="flex flex-row flex-wrap gap-2">
        {sportGameModes.map((gameMode: CreateSessionFromRequestDtoGameMode) => (
          <CreateSessionStep1Part3Item key={gameMode} gameMode={gameMode} />
        ))}
      </Box>
    </Animated.View>
  );
}
