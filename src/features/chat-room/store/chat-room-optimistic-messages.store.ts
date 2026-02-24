import { create } from 'zustand';

import { MessageCollectionItemDto } from '@/api/generated/model';

export type OptimisticMessage = MessageCollectionItemDto & {
  isSending: boolean;
  isError?: boolean;
  conversationId: string | null;
};

interface ChatRoomOptimisticMessagesStoreState {
  pendingMessages: Record<string, OptimisticMessage>;

  addPendingMessage: (message: OptimisticMessage) => void;

  removePendingMessage: (tempUid: string) => void;

  updatePendingMessage: (tempUid: string, updates: Partial<OptimisticMessage>) => void;

  getPendingMessages: () => OptimisticMessage[];

  hasPendingMessage: (tempUid: string) => boolean;
}

export const useChatRoomOptimisticMessagesStore = create<ChatRoomOptimisticMessagesStoreState>((set, get) => ({
  addPendingMessage: (message: OptimisticMessage) =>
    set(state => ({
      pendingMessages: { ...state.pendingMessages, [message.uid]: message },
    })),

  getPendingMessages: () => Object.values(get().pendingMessages),

  hasPendingMessage: (tempUid: string) => tempUid in get().pendingMessages,

  pendingMessages: {},

  removePendingMessage: (tempUid: string) =>
    set(state => {
      const { [tempUid]: _, ...rest } = state.pendingMessages;
      return { pendingMessages: rest };
    }),

  updatePendingMessage: (tempUid: string, updates: Partial<OptimisticMessage>) =>
    set(state => {
      const existing = state.pendingMessages[tempUid];
      if (!existing) return state;
      return {
        pendingMessages: {
          ...state.pendingMessages,
          [tempUid]: { ...existing, ...updates },
        },
      };
    }),
}));
