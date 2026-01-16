import { memo } from 'react';
import { Dayjs } from 'dayjs';
import { useTranslate } from '@tolgee/react';
import { String, Wrapper, Box } from '@ludo/ui';

import { DaysCarousel } from '@/components/ui/days-carousel';

import { useHomeSessionFiltersStore } from '../../../stores/home-sessions-filters.store';

function HomeSessionListHeader() {
  const { t } = useTranslate();
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
      <DaysCarousel contentContainerClassName="px-4" onSelect={handleDateSelect} />
      <Wrapper>
        <String font="primaryBold" variant="body-sm">
          {t('home.session_card_header_list_title')}
        </String>
      </Wrapper>
    </Box>
  );
}

export default memo(HomeSessionListHeader);
