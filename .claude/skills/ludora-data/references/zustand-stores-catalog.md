# Zustand stores catalog

Every store in `src/`, its shape, whether it is persisted, and whether `resetCaches()` resets it on logout. Paths relative to `src/`; registration source is `utils/reset-caches.utils.ts:27-42`.

`resetCaches()` (called from `logout()` in `hooks/auth-helpers.hook.ts:39` and from dev tools) does `mmkvStorage.reset()`, `queryClient.clear()`, then one `getState().reset()`-style call per registered store. Registered stores are listed in lines 28-42 of that file.

## 1. Global stores (`stores/`)

| Store | Shape | Persisted | Registered |
|---|---|---|---|
| useAuthStore (auth.store.ts) | `isAuthenticated`, `isLoading`, `setIsAuthenticated`, `setIsLoading` | yes, MMKV `AUTH_STORAGE`, `partialize` keeps only `isAuthenticated`, `onRehydrateStorage` sets `isLoading` false (lines 28-39) | no, but `logout()` calls `setIsAuthenticated(false)` first (auth-helpers.hook.ts:38) and `mmkvStorage.reset()` wipes the key |
| useOnBoardingStatusStore (on-boarding-status.store.ts) | `onBoardingStatus`, `setOnBoardingStatus`, `clear` | yes, MMKV `ON_BOARDING_STORAGE` (lines 21-24) | yes (`clear()`, line 28) |
| useUserLocationStore (user-geolocalisation.store.ts) | `location` (lat/lng or null), `setLocation`, `reset` | no | yes |
| useWebsocketStore (websocket.store.ts) | `status`, `tokenVersion`, `isAuthenticated`, `connectedUsers: Map`, add/remove/set actions | no | no (no `reset` either) |
| useSafeAreaStore (safe-area.store.ts) | `insets`, `setInsets` | no | no (device data, fine) |

Persisting recipe (copy from `stores/on-boarding-status.store.ts:14-25`): `create<T>()(persist(set => ({...}), { name: MMKV_STORAGE_KEY.X, storage: createJSONStorage(() => zustandStorage) }))`, key declared in `constants/mmkv-keys.constants.ts`. These two are the only `persist(` usages in `src/` (`MMKV_STORAGE_KEY.LIST_PERF_DEBUG` is declared but no store uses it).

## 2. Feature stores

| Store | File | Shape | Registered |
|---|---|---|---|
| useChatStore | features/chat/store/chat.store.ts | `filters`, `scrollToTop`, `setFilters` (merges `get().filters`), `setScrollToTop`, `reset` | yes |
| useFiltersStore | features/filters/filters/store/filters.store.ts | `instances` keyed by `FilterSource`, `currentSource`, `setFilters(obj or updater)`, `resetFilters`, `clearAllFilters` | yes (`clearAllFilters`) |
| useHomeSessionFiltersStore | features/home/stores/home-sessions-filters.store.ts | `filters`, `numberOfFilters`, `setFilters`, `reset` | yes |
| usePlayersFiltersStore | features/players/stores/players-filters.store.ts | `filters`, `numberOfFilters`, `setFilters`, `reset` | yes |
| useNotificationsFilterStore | features/notifications/stores/notifications-filter.store.ts | `filters: { type }`, `setFilters`, `reset` | yes |
| useMyFieldsFilterStore | features/my-fields/stores/my-fields-filter.store.ts | `filter`, `reset` (+ setter) | yes |
| useInviteFriendsFilterStore | features/invite-friends/stores/invite-friends-filter.store.ts | `filter` (null by default), `reset` | yes |
| useInviteFriendsStore | features/invite-friends/stores/invite-friends.store.ts | `friends`, `numberOfFriends`, `addFriend` (capped by `MAX_FRIENDS_TO_INVITE_LIMIT`), `removeFriend`, `reset` | yes |
| useSettingsFavoritesFilterStore | features/settings/stores/settings-favorites-filter.store.ts | `filters` (default `{ type: 'SESSIONS' }`), `reset` | yes |
| useSettingsHistoryFilterStore | features/settings/stores/settings-history-filter.store.ts | `filter`, `reset` | yes |
| useCreateSessionFiltersFieldsStore | features/create-session/store/create-session-filters-fields.store.ts | `filters`, `numberOfFilters`, `setFilters`, `reset` | yes |
| useCreateSessionStore | features/create-session/store/create-session.store.ts | `session`, `isStep3Valid`, `createdSessionUid`, `setSession` (merge + strips `''`/null/undefined), `reset` | yes |
| useSessionTeamStore | features/session/stores/session-team.store.ts | `teamUid`, `sideTeam`, setters, `reset` | yes |
| useCreateSessionLayoutStore | features/create-session/store/create-session-layout.store.ts | `footerHeight`, `setFooterHeight` | no (layout only) |
| useOnBoardingStore | features/on-boarding/stores/on-boarding.store.ts | `sportPreferences`, `availabilities` (`{ dayOfWeek, timePeriod }`), `upsertSportPreference`, `removeSportPreference`, `setAvailabilities(group, isSelected)`, `clearAll` | no |
| useSettingsPreferencesStore | features/settings/stores/settings-preferences.store.ts | `sportPreferences`, `initialize`, `toggle*`, `set*` | no (no reset) |
| useSettingsPlanningStore | features/settings/stores/settings-planning.store.ts | `planning`, `selectedDay`, `setToggleSlot` | no (no reset) |
| useProfilStore | features/profil/stores/profil.store.ts | `selectedTab` (uses a TS `enum ProfilTab`, which the code-style skill forbids), `setSelectedTab` | no |
| useChatRoomOptimisticMessagesStore | features/chat-room/store/chat-room-optimistic-messages.store.ts | `pendingMessages: Record<uid, OptimisticMessage>`, add/update/remove/has/get | no |
| useChatRoomMessageActionsMenuStore | features/chat-room/store/chat-room-message-actions-menu.store.ts | `showActionsMenu`, `anchor`, `pressedMessageData` + setters | no |
| useChatRoomScrollStore | features/chat-room/store/chat-room-scroll.store.ts | `scrollToEnd` callback, `setScrollToEnd` | no |
| createChatRoomStore (vanilla, per instance) | features/chat-room/store/chat-room.store.ts | `chatRoomId`, `chatRoomUserId`, `lastMessageCreatedAt`, `chatRoomInfo`, setters, `addChatRoomInfo` | n/a, dies with its provider |

## 3. Not registered in `reset-caches.utils.ts`, and why it may matter

Stores holding user-derived data that survive logout in memory (the app process stays alive after `logout()`):
- `useChatRoomOptimisticMessagesStore.pendingMessages` (messages typed by the previous user).
- `useOnBoardingStore` (`sportPreferences`, `availabilities`) although it already has `clearAll`.
- `useSettingsPreferencesStore` and `useSettingsPlanningStore` (previous user's preferences/planning until re-`initialize`/`setPlanning`), `useWebsocketStore.connectedUsers`.
Pure UI/ephemeral stores (`useSafeAreaStore`, `useCreateSessionLayoutStore`, `useChatRoomScrollStore`, `useChatRoomMessageActionsMenuStore`, `useProfilStore`) are harmless. When adding a store with user data, add `reset` and register it in lines 28-42 of the util.

## 4. Real shapes to copy

Filter store with count and merge, `features/players/stores/players-filters.store.ts:7-36`: pure `calculateNumberOfFilters` outside the store, `setFilters` computes `{ ...get().filters, ...filters }` then stores both `filters` and `numberOfFilters`, `reset` restores `{}` and `0`.

No-op guard, `stores/auth.store.ts:25-26`:
```ts
setIsAuthenticated: value => set(state => (state.isAuthenticated === value ? state : { isAuthenticated: value })),
setIsLoading: value => set(state => (state.isLoading === value ? state : { isLoading: value })),
```

Reset that rebuilds time-dependent defaults, `features/home/stores/home-sessions-filters.store.ts:50-68`: `getStartDay()` (next day after 22:00) is called both in the initial state and in `reset`.

## 5. Context-scoped store (chat room)

Vanilla factory, `features/chat-room/store/chat-room.store.ts:21-22`: `export const createChatRoomStore = () => createStore<ChatRoomStoreState>(set => ({ ... }))` (import from `zustand/vanilla`, line 1).

Provider and overloaded hook, `features/chat-room/context/chat-room-store-context.tsx:10-25`:
```tsx
export function ChatRoomProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createChatRoomStore());
  return <ChatRoomStoreContext.Provider value={store}>{children}</ChatRoomStoreContext.Provider>;
}

export function useChatRoomStore(): ChatRoomStoreState;
export function useChatRoomStore<U>(selector: (state: ChatRoomStoreState) => U): U;
export function useChatRoomStore<U>(selector?: (state: ChatRoomStoreState) => U): ChatRoomStoreState | U {
  const store = useContext(ChatRoomStoreContext);
  if (!store) {
    throw new Error('useChatRoomStore must be used within ChatRoomProvider');
  }
  return useStore(store, (selector ?? selectFullState) as (state: ChatRoomStoreState) => U | ChatRoomStoreState);
}
```
Mounted once per route in `app/(root)/chat-room/[chatRoomId]/_layout.tsx:7`. Consumers use one selector per field (`features/chat-room/queries/chat-room-message-queue/chat-room-message-queue.query.ts:13-17`). Note the split: per-room ids live in this scoped store, while `useChatRoomOptimisticMessagesStore` is global and filters by `msg.conversationId === chatRoomId` (`get-messages-by-chatroom-id.query.ts:42-44`).

## 6. Selector patterns in use

- One selector per field: `const setTeamUid = useSessionTeamStore(state => state.setTeamUid);` (`features/session/components/session-teams/session-teams-list/session-teams-list-item-join.component.tsx:23`).
- Multi-field pick with `useShallow`, `features/create-session/screens/create-session-step-3.screen.tsx:55-62`.
- Outside React: `useChatRoomOptimisticMessagesStore.getState()` inside an effect (`get-messages-by-chatroom-id.query.ts:60`).
- Name drift: SKILL.md writes `useHomeSessionsFiltersStore`, the real export is `useHomeSessionFiltersStore` (no "s").
