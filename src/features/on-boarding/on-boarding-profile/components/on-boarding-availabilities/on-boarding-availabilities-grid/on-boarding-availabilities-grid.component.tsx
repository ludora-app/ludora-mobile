import { BoxRow, Card } from '@ludo/ui';

import { OnBoardingAvailabilitiesGridDay } from './on-boarding-availabilities-grid-day.component';
import { OnBoardingAvailabilitiesGridCell } from './on-boarding-availabilities-grid-cell.component';
import { OnBoardingAvailabilitiesGridMoment } from './on-boarding-availabilities-grid-moment.component';
import { ON_BOARDING_MOMENTS, ON_BOARDING_DAYS_OF_WEEK } from '../../../constants/on-boarding.constants';

export const OnBoardingAvailabilitiesGrid = () => (
  <Card className="gap-1.5 px-2 pt-2 pb-2.5">
    <BoxRow className="items-center gap-1.25 pl-12.25">
      {ON_BOARDING_DAYS_OF_WEEK.map(dayOfWeek => (
        <OnBoardingAvailabilitiesGridDay key={dayOfWeek} dayOfWeek={dayOfWeek} />
      ))}
    </BoxRow>
    {ON_BOARDING_MOMENTS.map(moment => (
      <BoxRow key={moment.timePeriod} className="items-center gap-1.25">
        <OnBoardingAvailabilitiesGridMoment moment={moment} />
        {ON_BOARDING_DAYS_OF_WEEK.map(dayOfWeek => (
          <OnBoardingAvailabilitiesGridCell key={dayOfWeek} dayOfWeek={dayOfWeek} moment={moment} />
        ))}
      </BoxRow>
    ))}
  </Card>
);
