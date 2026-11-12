import { create } from 'zustand';

interface HomeFeaturedStore {
  reset: () => void;
  dismissedSessionUids: string[];
  /** Session joined from the featured card, until the player's sessions show it as the next match. */
  joinedSessionUid: string | null;
  dismissSession: (sessionUid: string) => void;
  setJoinedSessionUid: (sessionUid: string | null) => void;
}

/**
 * Sessions passed with "Pas pour moi", kept until the app is closed.
 * TODO(SCRUM-713): remembered by the recommendation engine once the backend supports it.
 */
export const useHomeFeaturedStore = create<HomeFeaturedStore>(set => ({
  dismissedSessionUids: [],
  dismissSession: sessionUid =>
    set(state =>
      state.dismissedSessionUids.includes(sessionUid)
        ? state
        : { dismissedSessionUids: [...state.dismissedSessionUids, sessionUid] },
    ),
  joinedSessionUid: null,
  reset: () => set({ dismissedSessionUids: [], joinedSessionUid: null }),
  setJoinedSessionUid: sessionUid =>
    set(state => (state.joinedSessionUid === sessionUid ? state : { joinedSessionUid: sessionUid })),
}));
