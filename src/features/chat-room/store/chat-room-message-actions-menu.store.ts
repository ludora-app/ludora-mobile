import { create } from 'zustand';

import { MessageCollectionItemDto } from '@/api/generated/model';

import { OptimisticMessage } from './chat-room-optimistic-messages.store';

export type MessageActionsAnchorRect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type ChatRoomMessageActionsMenuState = {
  showActionsMenu: boolean;
  setShowActionsMenu: (showActionsMenu: boolean) => void;
  anchor: MessageActionsAnchorRect | null;
  setAnchor: (rect: MessageActionsAnchorRect | null) => void;
  toggleShowActionsMenu: () => void;
  pressedMessageData: MessageCollectionItemDto | OptimisticMessage | null;
  setPressedMessageData: (pressedMessageData: MessageCollectionItemDto | OptimisticMessage | null) => void;
};

export const useChatRoomMessageActionsMenuStore = create<ChatRoomMessageActionsMenuState>(set => ({
  anchor: null,
  pressedMessageData: null,
  setAnchor: rect => set({ anchor: rect }),
  setPressedMessageData: pressedMessageData => set({ pressedMessageData }),
  setShowActionsMenu: showActionsMenu => set({ showActionsMenu }),
  showActionsMenu: false,
  toggleShowActionsMenu: () => set(state => ({ showActionsMenu: !state.showActionsMenu })),
}));
