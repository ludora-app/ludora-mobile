import { create } from 'zustand';
import { StrictOmit } from '@chillui/ui';

import { FriendsFindAllMyFriendsParams } from '@/api/generated/model';

type InviteFriendsParams = StrictOmit<FriendsFindAllMyFriendsParams, 'cursor' | 'limit'>;

interface InviteFriendsFilterStore {
  reset: () => void;
  filter: InviteFriendsParams | null;
  setFilter: (filter: InviteFriendsParams) => void;
}

export const useInviteFriendsFilterStore = create<InviteFriendsFilterStore>(set => ({
  filter: null,
  reset: () => set({ filter: null }),
  setFilter: (filter: InviteFriendsParams) => set({ filter }),
}));
