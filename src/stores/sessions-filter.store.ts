import { create } from 'zustand';

import { SessionsFindAllSuggestionsParams } from '@/api/generated/model';

interface EventFilterState {
  clearEventFilter: () => void;
  numberOfActiveFilter: number;
  sessionFilter: SessionsFindAllSuggestionsParams | null;
  setSessionFilter: (user: Partial<SessionsFindAllSuggestionsParams>) => void;
}

const countActiveFilters = (filter: Partial<SessionsFindAllSuggestionsParams>): number => {
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
  sessionFilter: null,
  setSessionFilter: data =>
    set({
      numberOfActiveFilter: countActiveFilters(data),
      sessionFilter: {
        ...get().sessionFilter,
        ...data,
      },
    }),
}));
