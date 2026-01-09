import { create } from 'zustand';

import { FriendResponseData } from '@/api/generated/model';

type FriendUid = FriendResponseData;

interface InviteFriendsStore {
  reset: () => void;
  friends: FriendUid[];
  numberOfFriends: number;

  addFriend: (friendUid: FriendUid) => void;
  removeFriend: (friendUid: FriendUid) => void;
}

export const useInviteFriendsStore = create<InviteFriendsStore>((set, get) => ({
  addFriend: (friendUid: FriendUid) =>
    set(state => ({
      friends: state.friends.length >= 10 ? state.friends : [...state.friends, friendUid],
    })),
  friends: [],
  numberOfFriends: get()?.friends?.length ?? 0,
  removeFriend: (friendUid: FriendUid) =>
    set(state => ({ friends: state.friends.filter(friend => friend !== friendUid) })),
  reset: () => set({ friends: [] }),
}));
