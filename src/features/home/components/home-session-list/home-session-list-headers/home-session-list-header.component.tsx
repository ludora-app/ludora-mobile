import { memo } from 'react';
import { String, Box } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import dayjs, { Dayjs } from '@/lib/dayjs';
import { DaysCarousel } from '@/components/ui/days-carousel';

import { useHomeSessionFiltersStore } from '../../../stores/home-sessions-filters.store';

function HomeSessionListHeader() {
  const { t } = useTranslate();
  const sessionDateStore = useHomeSessionFiltersStore(state => state.filters?.date?.date);
  const setSessionFilter = useHomeSessionFiltersStore(state => state.setFilters);

  const handleDateSelect = (date: Dayjs) => {
    setSessionFilter({
      date: {
        date: date.startOf('day').toISOString(),
        source: 'day-carousel',
      },
    });
  };

  return (
    <Box className="gap-5 py-5">
      <DaysCarousel onSelect={handleDateSelect} initialDate={dayjs(sessionDateStore)} />
      <String font="primaryBold" variant="body-sm">
        {t('home.session_card_header_list_title')}
      </String>
    </Box>
  );
}

export default memo(HomeSessionListHeader);
