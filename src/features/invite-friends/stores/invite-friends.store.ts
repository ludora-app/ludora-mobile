import { create } from 'zustand';

import { FriendResponseData } from '@/api/generated/model';

import { MAX_FRIENDS_TO_INVITE_LIMIT } from '../constants/invite-friends.constants';

type FriendUid = FriendResponseData;

interface InviteFriendsStore {
  reset: () => void;
  friends: FriendUid[];
  numberOfFriends: number;
  addFriend: (friendUid: FriendUid) => void;
  removeFriend: (friendUid: FriendUid) => void;
  setNumberOfFriends: (numberOfFriends: number) => void;
}

export const useInviteFriendsStore = create<InviteFriendsStore>((set, get) => ({
  addFriend: (friendUid: FriendUid) =>
    set(state => ({
      friends: state.friends.length >= MAX_FRIENDS_TO_INVITE_LIMIT ? state.friends : [...state.friends, friendUid],
      numberOfFriends:
        state.friends.length >= MAX_FRIENDS_TO_INVITE_LIMIT ? state.numberOfFriends : state.numberOfFriends + 1,
    })),
  friends: [],
  numberOfFriends: get()?.friends?.length ?? 0,
  removeFriend: (friendUid: FriendUid) =>
    set(state => ({
      friends: state.friends.filter(friend => friend !== friendUid),
      numberOfFriends: state.numberOfFriends - 1,
    })),
  reset: () => set({ friends: [], numberOfFriends: 0 }),
  setNumberOfFriends: (numberOfFriends: number) => set({ numberOfFriends }),
}));
