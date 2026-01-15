import { Chip } from '@ludo/ui';
import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';

import { CreateSessionFromRequestDtoGameMode } from '@/api/generated/model';

import { useFiltersStore } from '../../store/filters.store';

interface CreateSessionStep1Part3ItemProps {
  gameMode: CreateSessionFromRequestDtoGameMode;
}

export default function FilterModesItem({ gameMode }: CreateSessionStep1Part3ItemProps) {
  const { t } = useTranslate();

  const selectedGameMode = useFiltersStore(state => state.filters?.gameModes?.includes(gameMode));
  const setFilters = useFiltersStore(state => state.setFilters);

  const handlePress = () => {
    if (selectedGameMode) {
      setFilters(prev => ({ gameModes: prev.gameModes?.filter(selectedMode => selectedMode !== gameMode) }));
      return;
    }
    setFilters(prev => ({ gameModes: [...(prev.gameModes ?? []), gameMode] }));
  };

  return (
    <Chip
      title={t(`common.game_mode_${gameMode}`, { space: ' ' })}
      onPress={handlePress}
      variant="outlined"
      colorVariant={selectedGameMode ? 'primary' : 'dark'}
      className={cn('bg-white', { 'border-ring': !selectedGameMode })}
    />
  );
}
