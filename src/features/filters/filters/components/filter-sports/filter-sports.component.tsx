import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, BoxRowCenterBetween, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { SessionsFindAllSportsItem } from '@/api/generated/model';

import FilterSportsItem from './filter-sports-item.component';
import { useFiltersStore, selectFilters } from '../../store/filters.store';

interface SportProps {
  id: number;
  name: SessionsFindAllSportsItem;
}
const sports: SportProps[] = [
  {
    id: 1,
    name: SessionsFindAllSportsItem.TENNIS,
  },
  {
    id: 2,
    name: SessionsFindAllSportsItem.FOOTBALL,
  },
  {
    id: 3,
    name: SessionsFindAllSportsItem.BASKETBALL,
  },
  {
    id: 4,
    name: SessionsFindAllSportsItem.PADEL,
  },
];
export default function FilterSports() {
  const selecteSports = useFiltersStore(state => selectFilters(state)?.sports);
  const { t } = useTranslate();

  return (
    <Box className="gap-3 rounded-xl border border-ring bg-white p-3 py-2">
      {/* Header Toujours Visible */}
      <BoxRowCenterBetween>
        <BoxRow className="flex-1 items-center gap-2">
          <Icon name="running-regular" color={COLORS.muted} />
          <String variant="body-sm" font="primaryBold" colorVariant="muted">
            {t('common.sport')}
          </String>
        </BoxRow>
        <Box className="flex-1 items-end">
          <String variant="body-sm" font="primaryBold" truncate>
            {selecteSports && selecteSports.length > 0
              ? selecteSports
                  ?.map(
                    (sport: SessionsFindAllSportsItem, index: number) =>
                      `${t(`common.session_sport_${sport}`, { space: '' })}${index < selecteSports.length - 1 ? ', ' : ''}`,
                  )
                  .join('')
              : '-'}
          </String>
        </Box>
      </BoxRowCenterBetween>
      <Box className="flex flex-row flex-wrap gap-3">
        {sports.map(sport => (
          <FilterSportsItem key={sport.id} sport={sport} />
        ))}
      </Box>
    </Box>
  );
}
