import { create } from 'zustand';

interface SessionTeamStore {
  teamUid: string;
  reset: () => void;
  setTeamUid: (teamUid: string) => void;
}

export const useSessionTeamStore = create<SessionTeamStore>(set => ({
  reset: () => set({ teamUid: null }),
  setTeamUid: teamUid => set({ teamUid }),
  teamUid: null,
}));
