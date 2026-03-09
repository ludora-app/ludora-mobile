import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

interface KeyboardStoreState {
  height: number;
  isVisible: boolean;
  setHeight: (height: number) => void;
  setIsVisible: (isVisible: boolean) => void;
}

const DEFAULT_HEIGHT = 300;

export const useKeyboardStore = create<KeyboardStoreState>()(
  persist(
    (set) => ({
      height: DEFAULT_HEIGHT,
      isVisible: false,
      setHeight: (height) => set((state) => (state.height === height ? state : { height })),
      setIsVisible: (isVisible) => set({ isVisible }),
    }),
    {
      name: MMKV_STORAGE_KEY.KEYBOARD_STORAGE,
      partialize: (state) => ({ height: state.height }),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
