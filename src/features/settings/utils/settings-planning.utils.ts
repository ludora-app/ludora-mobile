import { CreateHourPreferenceData, HourPreferenceResponseData } from '@/api/generated/model';

type PlanningItem = HourPreferenceResponseData | CreateHourPreferenceData;

/**
 * Checks if the current planning state is different from the initial planning state.
 */
export const checkIsPlanningDirty = (
  initialPlanning: readonly PlanningItem[],
  currentPlanning: readonly PlanningItem[],
): boolean => JSON.stringify(initialPlanning) !== JSON.stringify(currentPlanning);
