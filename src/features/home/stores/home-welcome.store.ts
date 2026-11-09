import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

interface HomeWelcomeStore {
  reset: () => void;
  hasSeenBubble: boolean;
  setHasSeenBubble: () => void;
}

/** Whether Ludo's bubble was already shown on the home screen: only on the first visit after the on-boarding. */
export const useHomeWelcomeStore = create<HomeWelcomeStore>()(
  persist(
    set => ({
      hasSeenBubble: false,
      reset: () => set({ hasSeenBubble: false }),
      setHasSeenBubble: () => set(state => (state.hasSeenBubble ? state : { hasSeenBubble: true })),
    }),
    {
      name: MMKV_STORAGE_KEY.HOME_WELCOME_STORAGE,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
