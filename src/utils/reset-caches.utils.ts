import { QueryClient } from '@tanstack/react-query';

import { useChatStore } from '@/features/chat/store/chat.store';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useOnBoardingStatusStore } from '@/stores/on-boarding-status.store';
import { useFiltersStore } from '@/features/filters/filters/store/filters.store';
import { usePlayersFiltersStore } from '@/features/players/stores/players-filters.store';
import { useHomeSessionFiltersStore } from '@/features/home/stores/home-sessions-filters.store';
import { useNotificationsFilterStore } from '@/features/notifications/stores/notifications-filter.store';
import { useSettingsFavoritesFilterStore } from '@/features/settings/stores/settings-favorites-filter.store';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

import { mmkvStorage } from './mmkv-storage.utils';

const queryClient = new QueryClient();

export const resetCaches = () => {
  // reset mmkv
  mmkvStorage.reset();

  // reset react query caches
  queryClient.clear();

  // reset zustandStores
  useOnBoardingStatusStore.getState().clear();
  useFiltersStore.getState().clearAllFilters();
  useNotificationsFilterStore.getState().reset();
  useSettingsFavoritesFilterStore.getState().reset();
  useChatStore.getState().reset();
  usePlayersFiltersStore.getState().reset();
  useHomeSessionFiltersStore.getState().reset();
  useCreateSessionFiltersFieldsStore.getState().reset();
  useUserLocationStore.getState().reset();
};
