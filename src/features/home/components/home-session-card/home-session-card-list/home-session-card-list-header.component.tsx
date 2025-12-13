import { Input } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { String, Box, Wrapper } from '@ludo/ui';
import { SharedValue } from 'react-native-reanimated';

import { IS_IOS } from '@/constants/PLATFORM';
import { DaysCarousel } from '@/components/ui/days-carousel';

import HeaderSessionCardListRefreshControl from './header-session-card-list-refresh-control.component';

interface HomeSessionCardListHeaderProps {
  isFetching?: boolean;
  scrollY?: SharedValue<number>;
}

export default function HomeSessionCardListHeader({ isFetching, scrollY }: HomeSessionCardListHeaderProps) {
  const { t } = useTranslate();

  return (
    <Box className="pt-6">
      {IS_IOS && <HeaderSessionCardListRefreshControl scrollY={scrollY} isFetching={isFetching} />}
      <Wrapper>
        <Input placeholder="rechercher" />
      </Wrapper>
      <DaysCarousel className="my-5" contentContainerClassName="px-4" />
      <Wrapper className="mb-5">
        <String font="primaryBold" variant="body-sm">
          {t('home.session_card_header_list_title')}
        </String>
      </Wrapper>
    </Box>
  );
}
