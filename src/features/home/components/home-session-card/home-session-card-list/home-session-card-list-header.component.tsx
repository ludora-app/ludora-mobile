import { memo } from 'react';
import { Dayjs } from 'dayjs';
import { useTranslate } from '@tolgee/react';
import { String, Wrapper, Box } from '@ludo/ui';
import { SharedValue } from 'react-native-reanimated';

import { IS_IOS } from '@/constants/PLATFORM';
import { DaysCarousel } from '@/components/ui/days-carousel';

import { useSessionsFilterStore } from '../../../stores/home-sessions-filters.store';
import HeaderSessionCardListRefreshControl from './header-session-card-list-refresh-control.component';

interface HomeSessionCardListHeaderProps {
  isFetching?: boolean;
  scrollY?: SharedValue<number>;
}

function HomeSessionCardListHeader({ isFetching, scrollY }: HomeSessionCardListHeaderProps) {
  const { t } = useTranslate();
  const setSessionFilter = useSessionsFilterStore(state => state.setSessionFilter);
  const handleDateSelect = (date: Dayjs) => {
    requestAnimationFrame(() => {
      setSessionFilter({
        startDate: date.startOf('day').toISOString(),
      });
    });
    if (scrollY) {
      const scrollYRef = scrollY;
      scrollYRef.value = 0;
    }
  };
  return (
    <Box className="pt-6">
      {IS_IOS && <HeaderSessionCardListRefreshControl scrollY={scrollY} isFetching={isFetching} />}
      <DaysCarousel className="my-5" contentContainerClassName="px-4" onSelect={handleDateSelect} />
      <Wrapper className="mb-5">
        <String font="primaryBold" variant="body-sm">
          {t('home.session_card_header_list_title')}
        </String>
      </Wrapper>
    </Box>
  );
}

export default memo(HomeSessionCardListHeader);
