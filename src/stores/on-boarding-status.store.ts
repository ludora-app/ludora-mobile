import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';
import { FindMeUserResponseDataOnBoardingStatus } from '@/api/generated/model';

type OnBoardingState = {
  onBoardingStatus: FindMeUserResponseDataOnBoardingStatus | null;
  setOnBoardingStatus: (onBoardingStatus: FindMeUserResponseDataOnBoardingStatus | null) => void;
  clear: () => void;
};

export const useOnBoardingStatusStore = create<OnBoardingState>()(
  persist(
    set => ({
      clear: () => set({ onBoardingStatus: null }),
      onBoardingStatus: null,
      setOnBoardingStatus: onBoardingStatus => set({ onBoardingStatus }),
    }),
    {
      name: MMKV_STORAGE_KEY.ON_BOARDING_STORAGE,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
