import { create } from 'zustand';

type NotificationFilterParams = {
  type: 'all' | 'sessions' | 'friend_requests';
};

type NotificationFilterState = {
  filters: NotificationFilterParams;
  setFilters: (params: NotificationFilterParams) => void;
};

export const useNotificationsFilterStore = create<NotificationFilterState>(set => ({
  filters: {
    type: 'all',
  },
  setFilters: filters => set(state => ({ ...state, filters })),
}));
