import { useTranslate } from '@tolgee/react';
import { Box, ReanimatedBox } from '@ludo/ui';
import { FadeIn } from 'react-native-reanimated';

import { GAMEMODES_BY_SPORT } from '@/constants/session.constants';
import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';

import { useCreateSessionStore } from '../../../../store/create-session.store';
import CreateSessionSubtitle from '../../../create-session-subtitle-component';
import CreateSessionStep1Part3Item from './create-session-step-1-part-3-item.component';

export default function CreateSessionStep1Part3() {
  const { t } = useTranslate();
  const selectedSport = useCreateSessionStore(state => state.session?.additionalData?.sport);

  return (
    <ReanimatedBox entering={FadeIn}>
      <CreateSessionSubtitle title={t('create-session-steps.step-1.select_game_mode_title')} />
      <Box className="flex flex-row flex-wrap gap-2">
        {selectedSport &&
          GAMEMODES_BY_SPORT[selectedSport]?.map((gameMode: CreateSessionFromRequestDtoGameMode, index: number) => (
            <CreateSessionStep1Part3Item key={index} gameMode={gameMode} />
          ))}
      </Box>
    </ReanimatedBox>
  );
}
