import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, BoxRowCenterBetween, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { SessionCollectionItemDtoGameMode } from '@/api/generated/model';

import FilterModesItem from './filter-modes-item.component';
import { useFiltersStore, selectFilters } from '../../store/filters.store';

export default function FilterModes() {
  const selectedGameModes = useFiltersStore(state => selectFilters(state)?.gameModes);
  const { t } = useTranslate();
  return (
    <Box className="border-ring gap-3 rounded-xl border bg-white p-3 py-2">
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
                  (gameMode: SessionCollectionItemDtoGameMode, index: number) =>
                    `${t(`common.game_mode_${gameMode}`, { space: '' })}${index < selectedGameModes.length - 1 ? ', ' : ''}`,
                )
              : '-'}
          </String>
        </BoxRow>
      </BoxRowCenterBetween>
      <Box className="flex flex-row flex-wrap gap-2">
        {Object.values(SessionCollectionItemDtoGameMode).map(
          (gameMode: SessionCollectionItemDtoGameMode, index: number) => (
            <FilterModesItem key={index} gameMode={gameMode} />
          ),
        )}
      </Box>
    </Box>
  );
}
