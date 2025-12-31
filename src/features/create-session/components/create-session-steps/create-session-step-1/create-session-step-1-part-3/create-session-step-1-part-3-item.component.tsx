import { Chip } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';

import { useCreateSessionStore } from '../../../../store/create-session.store';

interface CreateSessionStep1Part3ItemProps {
  gameMode: CreateSessionFromRequestDtoGameMode;
}

export default function CreateSessionStep1Part3Item({ gameMode }: CreateSessionStep1Part3ItemProps) {
  const { t } = useTranslate();

  const selectedGameMode = useCreateSessionStore(state => state.session?.gameMode === gameMode);
  const setSession = useCreateSessionStore(state => state.setSession);

  return (
    <Chip
      title={t(`common.game_mode_${gameMode}`, { space: ' ' })}
      onPress={() => setSession({ gameMode })}
      variant="outlined"
      colorVariant={selectedGameMode ? 'primary' : 'muted'}
    />
  );
}
