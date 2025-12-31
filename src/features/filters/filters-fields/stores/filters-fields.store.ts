import { create } from 'zustand';

type Filters = {
  fieldType: 'PRIVATE' | 'PUBLIC' | 'ALL';
};

interface FiltersFieldsStore {
  filters: Filters[];
  setFilters: (filters: Filters[]) => void;
}

export const useFiltersFieldsStore = create<FiltersFieldsStore>(set => ({
  filters: [{ fieldType: 'ALL' }],
  setFilters: filters => set({ filters }),
}));
