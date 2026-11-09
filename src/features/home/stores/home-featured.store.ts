import { create } from 'zustand';

interface HomeFeaturedStore {
  reset: () => void;
  dismissedSessionUids: string[];
  dismissSession: (sessionUid: string) => void;
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
  reset: () => set({ dismissedSessionUids: [] }),
}));
