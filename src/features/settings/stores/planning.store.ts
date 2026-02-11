import { create } from 'zustand';

import { DayOfWeek, DayPlanning, PlanningData, SlotAvailability, SlotId } from '../types/settings-planning.types';

const DEFAULT_DAY_PLANNING: DayPlanning = {
  afternoon: 'none',
  evening: 'none',
  morning: 'none',
};

const DEFAULT_PLANNING: PlanningData = {
  friday: { ...DEFAULT_DAY_PLANNING },
  monday: { ...DEFAULT_DAY_PLANNING },
  saturday: { ...DEFAULT_DAY_PLANNING },
  sunday: { ...DEFAULT_DAY_PLANNING },
  thursday: { ...DEFAULT_DAY_PLANNING },
  tuesday: { ...DEFAULT_DAY_PLANNING },
  wednesday: { ...DEFAULT_DAY_PLANNING },
};

/**
 * Cycles through slot availability: none → once → recurring → none
 */
const getNextAvailability = (current: SlotAvailability): SlotAvailability => {
  switch (current) {
    case 'none':
      return 'once';
    case 'once':
      return 'recurring';
    case 'recurring':
      return 'none';
    default:
      return 'none';
  }
};

type PlanningState = {
  planning: PlanningData;
  selectedDay: DayOfWeek;
  selectDay: (day: DayOfWeek) => void;
  toggleSlot: (slot: SlotId) => void;
};

export const usePlanningStore = create<PlanningState>()(set => ({
  planning: DEFAULT_PLANNING,
  selectDay: (day: DayOfWeek) => set({ selectedDay: day }),
  selectedDay: 'monday' as DayOfWeek,
  toggleSlot: (slot: SlotId) =>
    set(state => {
      const currentAvailability = state.planning[state.selectedDay][slot];
      const nextAvailability = getNextAvailability(currentAvailability);
      return {
        planning: {
          ...state.planning,
          [state.selectedDay]: {
            ...state.planning[state.selectedDay],
            [slot]: nextAvailability,
          },
        },
      };
    }),
}));
