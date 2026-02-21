import { create } from 'zustand';

interface SafeAreaStore {
  insets: { top: number; bottom: number; left: number; right: number } | null;
  setInsets: (insets: { top: number; bottom: number; left: number; right: number }) => void;
}

export const useSafeAreaStore = create<SafeAreaStore>(set => ({
  insets: null,
  setInsets: insets => set({ insets }),
}));
