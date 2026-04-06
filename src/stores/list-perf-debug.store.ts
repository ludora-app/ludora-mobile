import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandStorage } from '@/utils/mmkv-storage.utils';
import { MMKV_STORAGE_KEY } from '@/constants/mmkv-keys.constants';

type ListPerfDebugState = {
  /** Master switch: list + item diagnostics (preview builds, or extra to __DEV__) */
  enabled: boolean;
  logs: boolean;
  reason: boolean;
  setEnabled: (value: boolean) => void;
  setLogs: (value: boolean) => void;
  setReason: (value: boolean) => void;
};

export const useListPerfDebugStore = create<ListPerfDebugState>()(
  persist(
    set => ({
      enabled: false,
      logs: false,
      reason: true,
      setEnabled: enabled => set({ enabled }),
      setLogs: logs => set({ logs }),
      setReason: reason => set({ reason }),
    }),
    {
      name: MMKV_STORAGE_KEY.LIST_PERF_DEBUG,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
