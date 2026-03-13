import { create } from 'zustand';

import { ConversationsFindAllByUserUidParams } from '@/api/generated/model';

interface ChatStore {
  reset: () => void;
  scrollToTop: (() => void) | null;
  filters: ConversationsFindAllByUserUidParams;
  setScrollToTop: (fn: (() => void) | null) => void;
  setFilters: (filters: ConversationsFindAllByUserUidParams) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  filters: {},
  reset: () => set({ filters: {} }),
  scrollToTop: null,
  setFilters: filters => set({ filters: { ...get().filters, ...filters } }),
  setScrollToTop: fn => set({ scrollToTop: fn }),
}));
