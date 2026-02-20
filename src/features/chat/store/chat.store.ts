import { create } from 'zustand';

import { ConversationsFindAllByUserUidParams } from '@/api/generated/model';

interface ChatStore {
  filters: ConversationsFindAllByUserUidParams;
  setFilters: (filters: ConversationsFindAllByUserUidParams) => void;
}

export const useChatStore = create<ChatStore>(set => ({
  filters: {},
  setFilters: filters => set(state => ({ filters: { ...state.filters, ...filters } })),
}));
