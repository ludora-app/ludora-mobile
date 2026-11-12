import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, String } from '@ludo/ui';

import { HomeSessionListSportChips } from './home-session-list-sport-chips.component';
import { HomeSessionListFiltersButton } from './home-session-list-filters-button.component';

/** "Toutes les sessions", the filters button and the sport chips, on the cream panel. */
export const HomeSessionListHeader = () => {
  const { t } = useTranslate();

  return (
    <Box className="gap-4 bg-background px-4 pb-4">
      <BoxRow className="items-center justify-between gap-3">
        <String variant="body-3" font="secondaryExtraBold" className="flex-1" truncate>
          {t('home.sessions.title')}
        </String>
        <HomeSessionListFiltersButton />
      </BoxRow>
      <HomeSessionListSportChips />
    </Box>
  );
};
