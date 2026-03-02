import { create } from 'zustand';

import dayjs, { Dayjs } from '@/lib/dayjs';
import { HourPreferenceData, HourPreferenceDataTimePeriod, HourPreferenceDataType } from '@/api/generated/model';

import { PlanningSlot } from '../types/settings-planning.types';

type PlanningState = {
  planning: HourPreferenceData[];
  selectedDay: Dayjs;
  setPlanning: (planning: readonly HourPreferenceData[]) => void;
  setSelectedDay: (date: Dayjs) => void;
  setToggleSlot: (slot: PlanningSlot) => void;
};

export const useSettingsPlanningStore = create<PlanningState>()((set, get) => ({
  planning: [],
  selectedDay: dayjs(),
  setPlanning: planning => set({ planning: [...planning] }),
  setSelectedDay: (date: Dayjs) => set({ selectedDay: date }),
  setToggleSlot: slot => {
    const state = get();
    const { selectedDay } = state;
    const dayOfWeek = selectedDay.day();
    const now = dayjs();
    const isToday = selectedDay.isSame(now, 'day');

    const existingOneTime = state.planning.find(
      p => p.timePeriod === slot.id && p.type === 'ONE_TIME' && dayjs(p.date).isSame(selectedDay, 'day'),
    );

    const existingRecurrent = state.planning.find(
      p => p.timePeriod === slot.id && p.type === 'RECURRENT' && p.dayOfWeek === dayOfWeek,
    );

    let skipOneTime = false;
    if (isToday) {
      if (slot.id === HourPreferenceDataTimePeriod.MORNING && now.hour() >= 12) {
        skipOneTime = true;
      } else if (slot.id === HourPreferenceDataTimePeriod.AFTERNOON && now.hour() >= 18) {
        skipOneTime = true;
      }
    }

    let newPlanning = [...state.planning];

    if (existingRecurrent) {
      newPlanning = newPlanning.filter(p => p !== existingRecurrent);
      if (existingOneTime) {
        newPlanning = newPlanning.filter(p => p !== existingOneTime);
      }
    } else if (existingOneTime) {
      newPlanning = newPlanning.filter(p => p !== existingOneTime);
      newPlanning.push({
        date: null,
        dayOfWeek,
        timePeriod: slot.id as HourPreferenceDataTimePeriod,
        type: HourPreferenceDataType.RECURRENT,
      });
    } else if (skipOneTime) {
      newPlanning.push({
        date: null,
        dayOfWeek,
        timePeriod: slot.id as HourPreferenceDataTimePeriod,
        type: HourPreferenceDataType.RECURRENT,
      });
    } else {
      let dateWithTime = selectedDay;
      if (slot.id === HourPreferenceDataTimePeriod.MORNING) {
        dateWithTime = dateWithTime.hour(12).minute(0).second(0).millisecond(0);
      } else if (slot.id === HourPreferenceDataTimePeriod.AFTERNOON) {
        dateWithTime = dateWithTime.hour(18).minute(0).second(0).millisecond(0);
      } else if (slot.id === HourPreferenceDataTimePeriod.EVENING) {
        dateWithTime = dateWithTime.hour(23).minute(59).second(59).millisecond(999);
      }

      newPlanning.push({
        date: dateWithTime.toISOString(),
        dayOfWeek,
        timePeriod: slot.id as HourPreferenceDataTimePeriod,
        type: HourPreferenceDataType.ONE_TIME,
      });
    }

    set({ planning: newPlanning });
  },
}));
