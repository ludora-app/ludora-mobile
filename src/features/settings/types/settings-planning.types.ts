import { TIconsAll } from '@/constants/icons.constants';
import { HourPreferenceDataTimePeriod } from '@/api/generated/model';

export type PlanningSlot = {
  icon: TIconsAll;
  id: HourPreferenceDataTimePeriod;
  label: string;
  time: string;
};
