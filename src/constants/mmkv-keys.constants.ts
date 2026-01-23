import { Flatten } from '@/types';

export const MMKV_STORAGE_KEY = {
  AUTH_STORAGE: 'auth-storage',
  DEV_TOOL_ENV_KEY_IS_GENERATE_ENABLE: 'dev_tools_selected_environment_is_generate_enable',
  FILTERS_SCREEN: {
    GO_BACK_PATH: 'filters_screen_goback_path',
    SOURCE: 'filters_screen_source',
  },
} as const;

export type MMKVStorageKeyValue = Flatten<typeof MMKV_STORAGE_KEY>;
