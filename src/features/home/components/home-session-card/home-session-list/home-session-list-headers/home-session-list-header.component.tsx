import { memo } from 'react';
import { Dayjs } from 'dayjs';
import { useTranslate } from '@tolgee/react';
import { String, Wrapper, Box } from '@ludo/ui';

import { DaysCarousel } from '@/components/ui/days-carousel';

import { useSessionsFilterStore } from '../../../../stores/home-sessions-filters.store';

function HomeSessionListHeader() {
  const { t } = useTranslate();
  const setSessionFilter = useSessionsFilterStore(state => state.setSessionFilter);

  const handleDateSelect = (date: Dayjs) => {
    setSessionFilter({
      startDate: date.startOf('day').toISOString(),
    });
  };

  return (
    <Box className="bg-background">
      <DaysCarousel className="my-5" contentContainerClassName="px-4" onSelect={handleDateSelect} />
      <Wrapper className="mb-5">
        <String font="primaryBold" variant="body-sm">
          {t('home.session_card_header_list_title')}
        </String>
      </Wrapper>
    </Box>
  );
}

export default memo(HomeSessionListHeader);
