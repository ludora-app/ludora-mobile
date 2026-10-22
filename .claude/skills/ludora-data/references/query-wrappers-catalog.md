# Query wrappers catalog

Every existing `*.query.ts` wrapper, grouped by kind, with one real example per kind. Search here (or `grep -rn "use<Tag><Op>" src`) before writing a new wrapper. Paths are relative to `src/`.

## 1. Single GET (envelope unwrapped, silent error tracking)

`queries/user-me.query.ts:5-26`: the `isEnabled` arg variant, returns a renamed field.
```ts
export const useUserMe = (isEnabled: boolean = true) => {
  const query = useUsersFindMe({
    query: {
      enabled: isEnabled,
    },
  });

  const { data: userMe, ...rest } = query;

  const { error, isError } = query || {};

  useGetMethodErrorTracking({
    error,
    extra: { context: 'useUserMe' },
    isError,
  });

  const userMeData = userMe?.data;
  const userMeId = userMeData?.uid;

  return { userMe: userMeData, userMeId, ...rest };
};
```
Other shapes in the repo: `{ ...query, data }` after `const { data } = query?.data || {}` (`features/chat-room/queries/get-chat-room-by-id.query.ts:12-24`), or a renamed `data` for a nested list (`features/session/queries/get-session-teams.query.ts:10-15` returns `teamsData?.data?.items` as `data`).

## 2. 404-tolerant GET

`queries/get-session-by-id.query.ts:6-30`: no retry on 404, no tracking for 404, `data` forced to `undefined`.
```ts
const query = useSessionsFindOne(id, {
  query: {
    enabled: !!id,
    retry: (failureCount, error: ErrorResponse) => {
      if (error?.api_error_status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  },
});
// ...
const isSessionNotFoundError = error?.api_error_status === 404;
useGetMethodErrorTracking({ error, isError: isError && !isSessionNotFoundError });
return { ...query, data: isSessionNotFoundError ? undefined : sessionData };
```
Same pattern: `features/profil/queries/get-user-data-by-id.query.ts:6-34` (adds `staleTime: Infinity`) and `features/profil/queries/friends/get-friend-request.query.ts:6-31` (also checks `error?.api_error?.statusCode === 404`, line 23).

## 3. Enabled-gated GET / list

- Id gate: `enabled: !!id` (`queries/get-field.query.ts`, `features/profil/queries/get-sessions-by-user-id.query.ts:17`).
- Boolean arg: `useGetSessionsMe(enabled)` (`features/profil/queries/get-sessions-me.query.ts:8-18`).
- Object arg: `useGetChatRoomById({ convId, enabled })` (`features/chat-room/queries/get-chat-room-by-id.query.ts:5-10`).
- Store gate: `enabled: !!chatRoomId` where the id comes from the context store (`features/chat-room/queries/get-messages-by-chatroom-id.query.ts:24`).
- Optional id: pass `userUid ?? ''` to the hook and gate with `!!userUid` (`features/chat-room/queries/get-chat-room-conv-id-by-user-id.query.ts:6-9`).

## 4. Infinite list (cursor), two-layer pattern

A thin hook owns the generated call, a `...ByFilter` hook owns store filters + `items`. Example, `features/notifications/queries/get-notifications.query.ts:5-10`:
```ts
export const useGetNotificationsMe = (filters: NotificationsFindAllParams) =>
  useNotificationsFindAllInfinite(filters, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
```
and `features/notifications/queries/get-notifications-by-filters.query.ts:12-31`:
```ts
const notificationsFilters = useNotificationsFilterStore(state => state.filters);
const cleanedFilters = useMemo(() => filterObjectEntries(notificationsFilters), [notificationsFilters]);
const params = useMemo(
  (): NotificationsFindAllParams => ({
    limit: LIMIT_RESULTS_NOTIFICATIONS,
    ...cleanedFilters as Partial<NotificationsFindAllParams>,
  }),
  [cleanedFilters],
);
const { data, error, isError, ...rest } = useGetNotificationsMe(params);
useGetMethodErrorTracking({ error, extra: { context: 'useGetAllNotificationsMe', params: cleanedFilters }, isError });
const items = useMemo(() => data?.pages.flatMap(page => page.data.items) ?? [], [data]);
return { ...rest, items };
```
Variants: `staleTime: Infinity` on a filtered list (`features/my-fields/queries/get-my-fields.query.ts:22-27`); `totalCount` from `data?.pages[0]?.data.totalCount` (`features/invite-friends/queries/get-user-friends-by-filter.query.ts:22-23`); route param in the filter (`sessionUid: sessionId`, same file :14,20); merging optimistic pending messages into `items` (`features/chat-room/queries/get-messages-by-chatroom-id.query.ts:38-49`).

## 5. Mutations

See `mutations-and-invalidation.md` for the invalidation matrix. Shape reference: `queries/update-user-me.query.ts:6-20`.

## 6. Table of all wrappers

| Wrapper | File | Generated hook |
|---|---|---|
| useUserMe | queries/user-me.query.ts | useUsersFindMe |
| useGetField | queries/get-field.query.ts | useFieldsFindOne |
| useGetSessionById | queries/get-session-by-id.query.ts | useSessionsFindOne |
| useGetSports, useGetSportGameModes(sport) | queries/get-sports.query.ts | none yet: mock `SPORTS_MOCK` (sports.constants) until GET /sports ships (SCRUM-685). No default data: `sports` is `[]` while loading, so lists show a skeleton (see `on-boarding-sports-list.component.tsx`). Sports and game modes always come from here, never from a hard-coded list |
| useMessagesUnread | queries/get-has-messages-unreads.query.ts | useConversationsHasUnreadMessages |
| useNotificationsUnreadCount | queries/get-notifications_unread_count.query.ts | useNotificationsGetUnreadCount |
| useUpdateUserMe | queries/update-user-me.query.ts | useUsersUpdate |
| usePutUserSportPreferences | queries/put-user-sport-preferences.query.ts | useSportPreferencesCreateManyWithGameModes |
| usePutUserHoursPreferences | queries/put-user-hours-preferences.query.ts | useHourPreferencesCreateMany |
| useChangeSessionTeam | queries/change-session-team.query.ts | useSessionPlayersSwitchTeams |
| useSendFriendInvitation(userId) | queries/send-friend-invitation.query.ts | useFriendsCreate |
| useRegisterDevice | queries/register-device.query.ts | useDevicesRegisterDevice |
| useUnRegisterDevice | queries/unRegister-device.query.ts | useDevicesUnregister |
| useLoginApple | features/auth/login/queries/login-apple.query.ts | useAuthB2CCreateOrConnectAppleUser |
| useLoginGoogle (default export) | features/auth/login/queries/login-google.query.ts | useAuthB2CCreateOrConnectGoogleUser |
| useRegister | features/auth/register/queries/register.query.ts | useAuthB2CRegister |
| useVerifyCode | features/auth/forgot-password/verify-code/queries/verify-code.query.ts | useAuthB2CGenerateAccessTokenFromCode |
| useSendVerificationCodeByEmail | features/auth/forgot-password/reset-password/queries/send-verification-code.query.ts | useUsersPasswordResetRequest |
| useNewPassword | features/auth/forgot-password/new-password/queries/new-password.query.ts | non-Orval: api/hooks/reset-user-password.hook |
| useSearchPlaces | features/filters/filters-addresses/queries/search-places.query.ts | non-Orval: api/hooks/places.hook (usePostPlaces) |
| useGetChatRoomById | features/chat-room/queries/get-chat-room-by-id.query.ts | useConversationsFindOne |
| useGetChatRoomConvIdByUserId | features/chat-room/queries/get-chat-room-conv-id-by-user-id.query.ts | useConversationsFindByUserUids |
| useGetMessagesByChatroomId | features/chat-room/queries/get-messages-by-chatroom-id.query.ts | useConversationsLoadMoreMessagesInfinite |
| useDeleteMessageMutation | features/chat-room/queries/chat-room-message-queue/delete-message.query.ts | useConversationsDeleteMessage (+ setQueryData) |
| useChatRoomMessageOptimisticQueue | features/chat-room/queries/chat-room-message-queue/chat-room-message-queue.query.ts | none (queryClient cache patches only) |
| useGetAllChatRooms | features/chat/queries/get-chatrooms.query.ts | useConversationsFindAllByUserUidInfinite |
| useGetAllChatRoomsByFilter | features/chat/queries/get-chatrooms-by-filter.query.ts | via useGetAllChatRooms |
| useLeaveSession(sessionUid) | features/chat-room-info/queries/leave-session.query.ts | useSessionPlayersLeaveSession |
| useLeaveSession (misnamed, see below) | features/chat-room-info/queries/change-session-team.query.ts | useSessionPlayersSwitchTeams |
| useCreateSession | features/create-session/queries/create-session.query.ts | useSessionsCreate |
| useAddField | features/create-session/queries/add-field.query.ts | useFieldsCreate |
| useInitializePaymentSheet | features/create-session/queries/initialize-payment-sheet.query.ts | usePaymentCreatePaymentIntent |
| useGetUserFriends | features/invite-friends/queries/get-user-friends.query.ts | useFriendsFindAllMyFriendsInfinite |
| useGetUserFriendsByFilter | features/invite-friends/queries/get-user-friends-by-filter.query.ts | via useGetUserFriends |
| useInviteFriends(sessionUid) | features/invite-friends/queries/invite-friends.query.ts | useSessionInvitationsCreateMany |
| useAddField | features/my-fields/queries/add-field.query.ts | useFieldsCreate |
| useGetMyFields | features/my-fields/queries/get-my-fields.query.ts | useFieldsFindAllMyFieldsInfinite |
| useGetNotificationsMe | features/notifications/queries/get-notifications.query.ts | useNotificationsFindAllInfinite |
| useGetNotificationsMeByFilters | features/notifications/queries/get-notifications-by-filters.query.ts | via useGetNotificationsMe |
| useDeleteNotification(uid) | features/notifications/queries/delete-notification.query.ts | useNotificationsDeleteNotification |
| useMarkReadNotifications | features/notifications/queries/mark-read-notifications.query.ts | useNotificationsMarkAllAsRead |
| useAcceptFriendRequest | features/notifications/queries/friend-requests/accept-friend-request.query.ts | useFriendsUpdate |
| useDeclineFriendRequest | features/notifications/queries/friend-requests/decline-friend-request.query.ts | useFriendsUpdate |
| useCreateSportPreference | features/on-boarding/queries/create-sport-preference.query.ts | useSportPreferencesCreateManyWithGameModes |
| useGetUsersSuggestion | features/players/queries/get-users-suggestion.query.ts | useUsersFindAllInfinite |
| useGetUsersSuggestionByFilter | features/players/queries/get-users-suggestion-by-filter.query.ts | via useGetUsersSuggestion |
| useSendFriendInvitation() | features/players/queries/send-friend-invitation.query.ts | useFriendsCreate |
| useBlockUser(userUid) | features/profil/queries/block-user.query.ts | useModerationBlockUser |
| useGetFriendRequest | features/profil/queries/friends/get-friend-request.query.ts | useFriendsFindMyFriendRequest |
| useGetSessionsByUserId | features/profil/queries/get-sessions-by-user-id.query.ts | useSessionsFindAllByUserUidInfinite |
| useGetSessionsMe(enabled) | features/profil/queries/get-sessions-me.query.ts | useSessionsFindAllMySessionsInfinite |
| useGetUserDataById | features/profil/queries/get-user-data-by-id.query.ts | useUsersFindOne |
| useRemoveFriend(userUid) | features/profil/queries/remove-friend.query.ts | useFriendsRemove |
| useReportUser | features/profil/queries/report-user.query.ts | useModerationCreateReport |
| useUpdateUserMeEmail | features/profil/queries/update-user-me-email.query.ts | useUsersUpdateEmail |
| useUpdateUserPassword | features/profil/queries/update-user-password.query.ts | useUsersUpdatePassword |
| useGetSessionTeams | features/session/queries/get-session-teams.query.ts | useSessionTeamsFindTeamsBySessionUid |
| useJoinSession(sessionUid) | features/session/queries/join-session.query.ts | useSessionPlayersJoinSession |
| useDeleteAccount | features/settings/queries/delete-account/delete-account.query.ts | useUsersDeletionRequest |
| useCancelDeleteAccount | features/settings/queries/delete-account/delete-account-cancel.query.ts | useUsersCancelDeletionRequest |
| useGetBlockedUsers | features/settings/queries/get-blocked-users.query.ts | useModerationFindAllBlockedUsers |
| useGetMyFriends | features/settings/queries/get-my-friends.query.ts | useFriendsFindAllMyFriendsInfinite |
| useGetSessionsMeStats | features/settings/queries/get-sessions-me-stats.query.ts | useSessionsGetMyStats |
| useGetSessionsMe() | features/settings/queries/get-sessions-me.query.ts | useSessionsFindAllMySessionsInfinite |
| useRemoveUserSportPreferences | features/settings/queries/remove-user-sport-preferences.query.ts | useSportPreferencesRemove |
| useUnblockUser(userUid) | features/settings/queries/unblock-user.query.ts | useModerationUnblockUser |
| useGetUserHoursPreferences | features/settings/queries/user-hours-preferences/get-user-hours-preferences.query.ts | useHourPreferencesFindMyHourPreferences |
| useRemoveUserHoursPreferences | features/settings/queries/user-hours-preferences/remove-user-hours-preferences.query.ts | useHourPreferencesRemove |

Non-Orval calls (`api/queries/*.query.ts`: `auth-google`, `places`, `refresh-token`, `reset-user-password`, `twenty-crm`) and dev-tools scripts (`features/dev-tools/queries/*`) are out of the Orval scope.

## 7. Inconsistencies found (do not copy)

- Duplicate names, different files: `useAddField` (create-session and my-fields, the latter invalidates `useInvalidateFieldsFindAllMyFields`), `useSendFriendInvitation` (`queries/` takes `userId`, `features/players/` takes none), `useGetSessionsMe` (profil vs settings). Import by full path and prefer extending the existing one.
- `features/chat-room-info/queries/change-session-team.query.ts:8` exports `useLeaveSession` (copy-paste name) and has no invalidation; the real switch-team wrapper is `queries/change-session-team.query.ts`.
- `features/chat-room-info/queries/leave-session.query.ts:18-22` calls `invalidateSessionsFindAllMySessions()` twice.
- The SKILL.md example `useGetSessionsByFilter` does not exist in `src/`; the live equivalents are `useGetNotificationsMeByFilters`, `useGetUsersSuggestionByFilter`, `useGetMyFields`.
