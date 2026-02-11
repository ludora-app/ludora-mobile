import { TIconsAll } from '@/constants/ICONS';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

/**
 * The availability status of a slot:
 * - 'none': not available
 * - 'once': available this specific day only
 * - 'recurring': available every week on this day
 */
export type SlotAvailability = 'none' | 'once' | 'recurring';

export type SlotId = 'morning' | 'afternoon' | 'evening';

export type PlanningSlot = {
  icon: TIconsAll;
  id: SlotId;
  label: string;
  time: string;
};

export type DayPlanning = Record<SlotId, SlotAvailability>;

export type PlanningData = Record<DayOfWeek, DayPlanning>;
