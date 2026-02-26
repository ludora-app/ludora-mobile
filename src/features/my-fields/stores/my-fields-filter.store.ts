import { create } from 'zustand';

import { FieldsFindAllMyFieldsParams } from '@/api/generated/model';

interface MyFieldsFilterState {
  reset: () => void;
  filter: FieldsFindAllMyFieldsParams;
  setFilter: (filter: FieldsFindAllMyFieldsParams) => void;
}

export const useMyFieldsFilterStore = create<MyFieldsFilterState>()(set => ({
  filter: {
    status: 'APPROVED',
  },
  reset: () => set({ filter: {} }),
  setFilter: filter => set(state => ({ filter: { ...state.filter, ...filter } })),
}));
