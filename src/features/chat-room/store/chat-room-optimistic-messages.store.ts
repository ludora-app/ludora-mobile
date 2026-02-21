import { create } from 'zustand';

import { MessageCollectionItemDto } from '@/api/generated/model';

export type OptimisticMessage = MessageCollectionItemDto & {
  isSending: boolean;
  isError?: boolean;
};

interface ChatRoomOptimisticMessagesStoreState {
  /** Map of pending optimistic messages keyed by their temp UID */
  pendingMessages: Record<string, OptimisticMessage>;

  /** Add a new optimistic message to the pending queue */
  addPendingMessage: (message: OptimisticMessage) => void;

  /** Remove a confirmed message from the pending queue */
  removePendingMessage: (tempUid: string) => void;

  /** Update an existing pending message */
  updatePendingMessage: (tempUid: string, updates: Partial<OptimisticMessage>) => void;

  /** Get all pending messages as an array */
  getPendingMessages: () => OptimisticMessage[];

  /** Check if a temp UID is still pending */
  hasPendingMessage: (tempUid: string) => boolean;

  /** Clear all pending messages (used on chat room unmount) */
  clearPendingMessages: () => void;
}

export const useChatRoomOptimisticMessagesStore = create<ChatRoomOptimisticMessagesStoreState>((set, get) => ({
  addPendingMessage: (message: OptimisticMessage) =>
    set(state => ({
      pendingMessages: { ...state.pendingMessages, [message.uid]: message },
    })),

  clearPendingMessages: () => set({ pendingMessages: {} }),

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
