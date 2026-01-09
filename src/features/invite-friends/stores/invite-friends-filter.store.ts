import { create } from 'zustand';
import { StrictOmit } from '@chillui/ui';

import { FriendsFindAllParams } from '@/api/generated/model';

type InviteFriendsParams = StrictOmit<FriendsFindAllParams, 'cursor' | 'limit'>;

interface InviteFriendsFilterStore {
  filter: InviteFriendsParams;
  setFilter: (filter: InviteFriendsParams) => void;
}

export const useInviteFriendsFilterStore = create<InviteFriendsFilterStore>(set => ({
  filter: null,
  setFilter: (filter: InviteFriendsParams) => set({ filter }),
}));
