import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, BoxRowCenter, BoxRowCenterBetween, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { SESSION_LEVEL_TYPE, SESSION_LEVELS } from '@/constants/session.constants';

import { useFiltersStore, selectFilters } from '../../store/filters.store';
import FilterLevelsItem from './filter-levels-item.component';

export default function FilterLevels() {
  const { t } = useTranslate();
  const selectedLevels = useFiltersStore(state => selectFilters(state)?.levels);
  return (
    <Box className="border-ring gap-3 rounded-xl border bg-white p-3 py-2">
      <BoxRowCenterBetween>
        <BoxRow className="flex-1 items-center gap-2">
          <Icon name="equalizer-regular" color={COLORS.muted} />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('filters.levels_title')}
          </String>
        </BoxRow>
        <Box className="flex-1 items-end">
          <String variant="body-sm" font="primaryBold" truncate>
            {selectedLevels && selectedLevels.length > 0
              ? selectedLevels
                  ?.map(
                    (level: SESSION_LEVEL_TYPE['code'], index: number) =>
                      `${t(`common.session_level_${level}`, '')}${index < selectedLevels.length - 1 ? ', ' : ''}`,
                  )
                  .join('')
              : '-'}
          </String>
        </Box>
      </BoxRowCenterBetween>

      <BoxRowCenter className="justify-around">
        {SESSION_LEVELS.map(difficulty => (
          <FilterLevelsItem key={difficulty.code} difficulty={difficulty} />
        ))}
      </BoxRowCenter>
    </Box>
  );
}
