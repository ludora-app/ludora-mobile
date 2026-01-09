import { create } from 'zustand';

import { SessionsFindAllParams } from '@/api/generated/model';

interface EventFilterState {
  clearEventFilter: () => void;
  numberOfActiveFilter: number;
  sessionFilter: SessionsFindAllParams | null;
  setSessionFilter: (user: Partial<SessionsFindAllParams>) => void;
}

const countActiveFilters = (filter: Partial<SessionsFindAllParams>): number => {
  const count = 0;

  // if (filter?.date?.startDate || filter?.date?.endDate) count += 1;
  // if (filter?.location?.latitude && filter?.location?.longitude && filter?.location?.perimeter) count += 1;
  // if (filter?.amount?.min != null && filter?.amount?.max != null) count += 1;
  // if (filter?.visibility?.key) count += 1;

  return count;
};

export const useSessionsFilterStore = create<EventFilterState>((set, get) => ({
  clearEventFilter: () => set({ numberOfActiveFilter: 0, sessionFilter: null }),
  numberOfActiveFilter: 0,
  sessionFilter: {
    startDate: new Date().toISOString(),
  },
  setSessionFilter: data =>
    set({
      numberOfActiveFilter: countActiveFilters(data),
      sessionFilter: {
        ...get().sessionFilter,
        ...data,
      },
    }),
}));
