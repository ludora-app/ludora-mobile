import { create } from 'zustand';

type Filters = {
  fieldType: 'PRIVATE' | 'PUBLIC' | 'ALL';
  sessionDuration: string;
};

interface FiltersStore {
  filters: Partial<Filters>;
  setFilters: (filters: Partial<Filters>) => void;
}

export const useFiltersStore = create<FiltersStore>((set, get) => ({
  filters: { fieldType: 'ALL' },
  setFilters: filters => set({ filters: { ...get().filters, ...filters } }),
}));
