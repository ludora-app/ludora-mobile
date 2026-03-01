import { create } from 'zustand';

import { ConversationsFindAllByUserUidParams } from '@/api/generated/model';

interface ChatStore {
  scrollToTop: (() => void) | null;
  filters: ConversationsFindAllByUserUidParams;
  setScrollToTop: (fn: (() => void) | null) => void;
  setFilters: (filters: ConversationsFindAllByUserUidParams) => void;
}

export const useChatStore = create<ChatStore>(set => ({
  filters: {},
  scrollToTop: null,
  setFilters: filters => set(state => ({ filters: { ...state.filters, ...filters } })),
  setScrollToTop: fn => set({ scrollToTop: fn }),
}));
