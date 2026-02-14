import { create } from 'zustand';

import { SessionsFindAllMySessionsParams } from '@/api/generated/model';

interface SettingsHistoryFilterState {
  reset: () => void;
  filter: SessionsFindAllMySessionsParams;
  setFilter: (filter: SessionsFindAllMySessionsParams) => void;
}

export const useSettingsHistoryFilterStore = create<SettingsHistoryFilterState>()(set => ({
  filter: {
    scope: 'ALL',
  },
  reset: () => set({ filter: {} }),
  setFilter: filter => set(state => ({ filter: { ...state.filter, ...filter } })),
}));
