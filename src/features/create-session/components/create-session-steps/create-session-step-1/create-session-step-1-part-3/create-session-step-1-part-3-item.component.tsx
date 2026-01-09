import { Chip } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

import { useCreateSessionStore } from '../../../../store/create-session.store';

interface CreateSessionStep1Part3ItemProps {
  gameMode: CreateSessionFromRequestDtoGameMode;
}

export default function CreateSessionStep1Part3Item({ gameMode }: CreateSessionStep1Part3ItemProps) {
  const { t } = useTranslate();

  const selectedGameMode = useCreateSessionStore(state => state.session?.gameMode === gameMode);
  const setSession = useCreateSessionStore(state => state.setSession);
  const setSessionFilters = useCreateSessionFiltersFieldsStore(state => state.setFilters);

  const handlePress = () => {
    setSession({ gameMode });
    setSessionFilters({ gameModes: [gameMode] });
  };

  return (
    <Chip
      title={t(`common.game_mode_${gameMode}`, { space: ' ' })}
      onPress={handlePress}
      variant="outlined"
      colorVariant={selectedGameMode ? 'primary' : 'muted'}
      className="bg-white"
    />
  );
}
