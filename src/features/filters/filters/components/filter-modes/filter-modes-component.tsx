import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, BoxRowCenterBetween, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { SessionCollectionItemGameMode } from '@/api/generated/model';

import FilterModesItem from './filter-modes-item.component';
import { useFiltersStore } from '../../store/filters.store';

export default function FilterModes() {
  const selectedGameModes = useFiltersStore(state => state.filters?.gameModes);
  const { t } = useTranslate();
  return (
    <Box className="gap-3 rounded-xl border border-ring bg-white p-3 py-2">
      <BoxRowCenterBetween>
        <Box className="flex-1 flex-row items-center gap-2">
          <Icon name="format-circle-regular" color={COLORS.muted} />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.modes_title')}
          </String>
        </Box>
        <BoxRow className="flex-1 items-center justify-end">
          <String variant="body-sm" font="primaryBold" truncate>
            {selectedGameModes?.length > 0
              ? selectedGameModes?.map(
                  (gameMode: SessionCollectionItemGameMode, index: number) =>
                    `${t(`common.game_mode_${gameMode}`, { space: '' })}${index < selectedGameModes.length - 1 ? ', ' : ''}`,
                )
              : '-'}
          </String>
        </BoxRow>
      </BoxRowCenterBetween>
      <Box className="flex flex-row flex-wrap gap-2">
        {Object.values(SessionCollectionItemGameMode).map((gameMode: SessionCollectionItemGameMode, index: number) => (
          <FilterModesItem key={index} gameMode={gameMode} />
        ))}
      </Box>
    </Box>
  );
}
