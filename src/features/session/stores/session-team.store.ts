import { create } from 'zustand';

interface SessionTeamStore {
  reset: () => void;
  teamUid: string | undefined;
  sideTeam: 'left' | 'right' | undefined;
  setTeamUid: (teamUid: string | undefined) => void;
  setSideTeam: (sideTeam: 'left' | 'right' | undefined) => void;
}

export const useSessionTeamStore = create<SessionTeamStore>(set => ({
  reset: () => set({ sideTeam: undefined, teamUid: undefined }),
  setSideTeam: sideTeam => set({ sideTeam }),
  setTeamUid: teamUid => set({ teamUid }),
  sideTeam: undefined,
  teamUid: undefined,
}));
