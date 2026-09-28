import { queryClient } from '@/providers/query.provider';
import { useChatStore } from '@/features/chat/store/chat.store';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';
import { useOnBoardingStatusStore } from '@/stores/on-boarding-status.store';
import { useFiltersStore } from '@/features/filters/filters/store/filters.store';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import { usePlayersFiltersStore } from '@/features/players/stores/players-filters.store';
import { useMyFieldsFilterStore } from '@/features/my-fields/stores/my-fields-filter.store';
import { useCreateSessionStore } from '@/features/create-session/store/create-session.store';
import { useInviteFriendsStore } from '@/features/invite-friends/stores/invite-friends.store';
import { useHomeSessionFiltersStore } from '@/features/home/stores/home-sessions-filters.store';
import { useNotificationsFilterStore } from '@/features/notifications/stores/notifications-filter.store';
import { useSettingsHistoryFilterStore } from '@/features/settings/stores/settings-history-filter.store';
import { useInviteFriendsFilterStore } from '@/features/invite-friends/stores/invite-friends-filter.store';
import { useSettingsFavoritesFilterStore } from '@/features/settings/stores/settings-favorites-filter.store';
import { useCreateSessionFiltersFieldsStore } from '@/features/create-session/store/create-session-filters-fields.store';

import { mmkvStorage } from './mmkv-storage.utils';

export const resetCaches = () => {
  // reset mmkv
  mmkvStorage.reset();

  // reset react query caches (the app-wide client, not a new instance)
  queryClient.clear();

  // reset zustandStores
  useOnBoardingStatusStore.getState().clear();
  useFiltersStore.getState().clearAllFilters();
  useNotificationsFilterStore.getState().reset();
  useSettingsFavoritesFilterStore.getState().reset();
  useSettingsHistoryFilterStore.getState().reset();
  useChatStore.getState().reset();
  usePlayersFiltersStore.getState().reset();
  useHomeSessionFiltersStore.getState().reset();
  useCreateSessionFiltersFieldsStore.getState().reset();
  useCreateSessionStore.getState().reset();
  useMyFieldsFilterStore.getState().reset();
  useInviteFriendsFilterStore.getState().reset();
  useInviteFriendsStore.getState().reset();
  useSessionTeamStore.getState().reset();
  useUserLocationStore.getState().reset();
};
