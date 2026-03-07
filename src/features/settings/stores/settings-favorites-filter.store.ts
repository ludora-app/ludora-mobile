import { create } from 'zustand';

export type FavoritesActiveTab = 'SESSIONS' | 'FIELDS';

type params = {
  type: FavoritesActiveTab;
};

interface SettingsFavoritesFilterState {
  filters: params;
  reset: () => void;
  setFilters: (filters: params) => void;
}

export const useSettingsFavoritesFilterStore = create<SettingsFavoritesFilterState>()(set => ({
  filters: {
    type: 'SESSIONS',
  },
  reset: () => set({ filters: { type: 'SESSIONS' } }),
  setFilters: filters => set(state => ({ ...state, filters })),
}));
