import { create } from 'zustand';

import { NotificationsFindAllType } from '@/api/generated/model';

type NotificationFilterParams = { type: NotificationsFindAllType | '' };
type NotificationFilterState = {
  filters: NotificationFilterParams;
  reset: () => void;
  setFilters: (params: NotificationFilterParams) => void;
};

export const useNotificationsFilterStore = create<NotificationFilterState>(set => ({
  filters: { type: '' },
  reset: () => set({ filters: { type: '' } }),
  setFilters: filters => set(state => ({ ...state, filters })),
}));
