import { TIconsAll } from '@/constants/icons.constants';
import { CreateHourPreferenceDataTimePeriod } from '@/api/generated/model';

export type PlanningSlot = {
  icon: TIconsAll;
  id: CreateHourPreferenceDataTimePeriod;
  label: string;
  time: string;
};
