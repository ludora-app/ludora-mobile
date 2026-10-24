import { useTranslate } from '@tolgee/react';
import { Box, String, WrapperScrollView } from '@ludo/ui';

import { ON_BOARDING_WEEK_DAYS, ON_BOARDING_WEEKEND_DAYS } from '../constants/on-boarding.constants';
import { OnBoardingAvailabilitiesRecap } from '../components/on-boarding-availabilities/on-boarding-availabilities-recap.component';
import { OnBoardingAvailabilitiesShortcut } from '../components/on-boarding-availabilities/on-boarding-availabilities-shortcut.component';
import { OnBoardingAvailabilitiesGrid } from '../components/on-boarding-availabilities/on-boarding-availabilities-grid/on-boarding-availabilities-grid.component';

export const OnBoardingStep2Screen = () => {
  const { t } = useTranslate();

  return (
    <WrapperScrollView contentContainerClassName="gap-4.5 pt-6.5 pb-6">
      <Box className="gap-1.5">
        <String variant="title-1" className="text-center">
          {t('on-boarding.availabilities.title')}
        </String>
        <String variant="body-sm" colorVariant="muted" className="text-center">
          {t('on-boarding.availabilities.description')}
        </String>
      </Box>
      <Box className="gap-2">
        <OnBoardingAvailabilitiesShortcut
          daysOfWeek={ON_BOARDING_WEEK_DAYS}
          labelKey="on-boarding.availabilities.week_shortcut"
        />
        <OnBoardingAvailabilitiesShortcut
          daysOfWeek={ON_BOARDING_WEEKEND_DAYS}
          labelKey="on-boarding.availabilities.weekend_shortcut"
        />
      </Box>
      <OnBoardingAvailabilitiesGrid />
      <OnBoardingAvailabilitiesRecap />
    </WrapperScrollView>
  );
};
