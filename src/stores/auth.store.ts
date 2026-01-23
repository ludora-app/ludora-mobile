import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

interface AuthStoreState {
  isLoading: boolean;
  isAuthenticated: boolean;

  setIsLoading: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
}

const initialState = {
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthStore = create<AuthStoreState>()(
  persist(
    set => ({
      ...initialState,

      setIsAuthenticated: value => set(state => (state.isAuthenticated === value ? state : { isAuthenticated: value })),
      setIsLoading: value => set(state => (state.isLoading === value ? state : { isLoading: value })),
    }),
    {
      name: MMKV_STORAGE_KEY.AUTH_STORAGE,
      onRehydrateStorage: () => state => {
        // Remettre isLoading à false après la restauration
        state?.setIsLoading(false);
      },
      // Ne persister que isAuthenticated, pas isLoading
      partialize: state => ({
        isAuthenticated: state.isAuthenticated,
      }),
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
