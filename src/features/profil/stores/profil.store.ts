import { create } from 'zustand';

export enum ProfilTab {
  Matches = 'matches',
  Badges = 'badges',
}
interface ProfilStoreState {
  selectedTab: ProfilTab;
  setSelectedTab: (tab: ProfilTab) => void;
}

export const useProfilStore = create<ProfilStoreState>(set => ({
  selectedTab: ProfilTab.Matches,
  setSelectedTab: (tab: ProfilTab) => set({ selectedTab: tab }),
}));
