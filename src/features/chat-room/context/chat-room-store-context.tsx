import { useStore } from 'zustand';
import { createContext, useContext, useRef, type ReactNode } from 'react';

import { createChatRoomStore, type ChatRoomStoreState } from '../store/chat-room.store';

type ChatRoomStoreApi = ReturnType<typeof createChatRoomStore>;

const ChatRoomStoreContext = createContext<ChatRoomStoreApi | null>(null);

export function ChatRoomProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<ChatRoomStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createChatRoomStore();
  }
  return <ChatRoomStoreContext.Provider value={storeRef.current}>{children}</ChatRoomStoreContext.Provider>;
}

const selectFullState = (state: ChatRoomStoreState) => state;

export function useChatRoomStore(): ChatRoomStoreState;
export function useChatRoomStore<U>(selector: (state: ChatRoomStoreState) => U): U;
export function useChatRoomStore<U>(selector?: (state: ChatRoomStoreState) => U): ChatRoomStoreState | U {
  const store = useContext(ChatRoomStoreContext);
  if (!store) {
    throw new Error('useChatRoomStore must be used within ChatRoomProvider');
  }
  return useStore(
    store,
    (selector ?? selectFullState) as (state: ChatRoomStoreState) => U | ChatRoomStoreState,
  );
}
