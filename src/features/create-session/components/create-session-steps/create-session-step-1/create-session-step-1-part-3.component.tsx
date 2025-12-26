import { Box, Chip } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { GAMEMODES_BY_SPORT } from '@/constants/session.constants';
import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';

import { createSessionStore } from '../../../store/create-session.store';
import CreateSessionSubtitle from '../../create-session-subtitle-component copy';

export default function CreateSessionStep1Part3() {
  const { t } = useTranslate();
  const selectedSport = createSessionStore(state => state.session?.sport);
  const selectedGameMode = createSessionStore(state => state.session?.gameMode);
  const setSession = createSessionStore(state => state.setSession);

  const isSelectedGameMode = (gameMode: CreateSessionFromRequestDtoGameMode) => selectedGameMode === gameMode;

  return (
    <Box>
      <CreateSessionSubtitle title={t('create-session-steps.step-1.select_game_mode_title')} />
      <Box className="flex flex-row flex-wrap gap-2">
        {GAMEMODES_BY_SPORT[selectedSport].map((gameMode: CreateSessionFromRequestDtoGameMode, index: number) => (
          <Chip
            key={index}
            title={t(`common.game_mode_${gameMode}`, { space: ' ' })}
            onPress={() => setSession({ gameMode })}
            variant="outlined"
            colorVariant={isSelectedGameMode(gameMode) ? 'primary' : 'muted'}
          />
        ))}
      </Box>
    </Box>
  );
}
