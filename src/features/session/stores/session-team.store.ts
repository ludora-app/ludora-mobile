import { create } from 'zustand';

interface SessionTeamStore {
  reset: () => void;
  teamUid: string | undefined;
  setTeamUid: (teamUid: string) => void;
  sideTeam: 'left' | 'right' | undefined;
  setSideTeam: (sideTeam: 'left' | 'right') => void;
}

export const useSessionTeamStore = create<SessionTeamStore>(set => ({
  reset: () => set({ sideTeam: undefined, teamUid: undefined }),
  setSideTeam: sideTeam => set({ sideTeam }),
  setTeamUid: teamUid => set({ teamUid }),
  sideTeam: undefined,
  teamUid: undefined,
}));
