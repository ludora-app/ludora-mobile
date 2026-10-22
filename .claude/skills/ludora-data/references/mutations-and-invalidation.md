# Mutations and invalidation

Which `useInvalidate*` helpers real wrappers call together per entity, and how components call the mutation. Paths relative to `src/`; helpers all come from `@/api/generated/invalidate-queries`.

## 1. Invalidation matrix (hook-level `onSuccess`)

| Wrapper | File | Invalidates (arg in parens) |
|---|---|---|
| useJoinSession | features/session/queries/join-session.query.ts:17-22 | SessionsFindOne(sessionUid), SessionTeamsFindTeamsBySessionUid(sessionUid), SessionsFindAllMySessions(), ConversationsFindAllByUserUid() |
| useLeaveSession | features/chat-room-info/queries/leave-session.query.ts:17-23 | same four as join (plus a duplicate SessionsFindAllMySessions call) |
| useChangeSessionTeam | queries/change-session-team.query.ts:15-19 | SessionsFindOne(sessionUid), ConversationsFindAllByUserUid(), SessionTeamsFindTeamsBySessionUid(sessionUid) |
| useCreateSession | features/create-session/queries/create-session.query.ts:15-18 | SessionsFindAllMySessions(), ConversationsFindAllByUserUid() |
| useBlockUser | features/profil/queries/block-user.query.ts:17-22 | FriendsFindAllMyFriends(), UsersFindAll(), UsersFindOne(userUid), ModerationFindAllBlockedUsers() |
| useUnblockUser | features/settings/queries/unblock-user.query.ts:15-19 | ModerationFindAllBlockedUsers(), UsersFindOne(userUid), UsersFindAll() |
| useRemoveFriend | features/profil/queries/remove-friend.query.ts:15-19 | FriendsFindMyFriendRequest(userUid), UsersFindAll(), UsersFindOne(userUid) |
| useSendFriendInvitation | features/players/queries/send-friend-invitation.query.ts:10-13 | FriendsFindMyFriendRequest(variables.data.receiverUid, read from `onSuccess: (_data, variables)`), UsersFindAll() |
| useAcceptFriendRequest | features/notifications/queries/friend-requests/accept-friend-request.query.ts:18-23 | NotificationsFindAll(), UsersFindMe(), UsersFindOne(friendUid), FriendsFindAllMyFriends() |
| useMarkReadNotifications | features/notifications/queries/mark-read-notifications.query.ts:13-16 | NotificationsFindAll(), NotificationsGetUnreadCount() |
| useDeleteNotification | features/notifications/queries/delete-notification.query.ts:9 | NotificationsFindAll() |
| useUpdateUserMe, useUpdateUserMeEmail, useDeleteAccount, useCancelDeleteAccount | queries/update-user-me.query.ts:10 and siblings | UsersFindMe() |
| usePutUserSportPreferences, useRemoveUserSportPreferences | queries/put-user-sport-preferences.query.ts:39 | UsersFindMe() |
| usePutUserHoursPreferences, useRemoveUserHoursPreferences | queries/put-user-hours-preferences.query.ts:10 (shared by settings and on-boarding), features/settings/queries/user-hours-preferences/remove-user-hours-preferences.query.ts:9 | HourPreferencesFindMyHourPreferences() |
| useInviteFriends | features/invite-friends/queries/invite-friends.query.ts:10-12 | FriendsFindAllMyFriends() |
| useAddField (my-fields) | features/my-fields/queries/add-field.query.ts:9-11 | FieldsFindAllMyFields() |

Rules visible in the matrix:
- Entity with a detail query takes a uid arg (`invalidateSessionById(sessionUid)`); list helpers take none so every filtered/infinite variant is hit.
- Session membership changes (join, leave, switch team, create) always include the conversations list, because a chat room appears or disappears.
- User-to-user actions (block, unblock, remove, accept) hit `UsersFindOne(uid)` and `UsersFindAll()`, and friend lists when the friendship changes.
- Wrappers with no cache effect have no `onSuccess`: `useReportUser` (`features/profil/queries/report-user.query.ts`), `useRegisterDevice`, `useVerifyCode`.

## 2. Wrapper anatomy with a uid in the hook signature

`features/profil/queries/block-user.query.ts:10-32` (full file):
```ts
export const useBlockUser = (userUid: string) => {
  const invalidateAllMyFriends = useInvalidateFriendsFindAllMyFriends();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();
  const invalidateUserFindOne = useInvalidateUsersFindOne();
  const invalidateBlockedUsers = useInvalidateModerationFindAllBlockedUsers();
  const mutate = useModerationBlockUser({
    mutation: {
      onSuccess: () => {
        invalidateAllMyFriends();
        invalidateUsersFindAll();
        invalidateUserFindOne(userUid);
        invalidateBlockedUsers();
      },
    },
  });

  const mutateAsync = () => mutate.mutateAsync({ userToBlockUid: userUid });

  return {
    ...mutate,
    mutateAsync,
  };
};
```
Note: this file names the variable `mutate`, most others `mutation`. SKILL.md asks for `mutation`.

## 3. Guard and throw inside the wrapper

`features/notifications/queries/friend-requests/accept-friend-request.query.ts:27-30`:
```ts
const mutateAsync = () => {
  if (!friendUid) throw new Error('Friend UID is required');
  return mutation.mutateAsync({ data: { status: 'ACCEPTED' }, userUid: friendUid });
};
```

## 4. Per-call side effects (analytics identity) in the 2nd arg

`queries/put-user-sport-preferences.query.ts:34-62`: hook-level `onSuccess` invalidates, the call-level `onSuccess` sends `trackIdentity`.
```ts
const mutateAsync = (data: CreateSportPreferenceDto) =>
  mutation.mutateAsync(
    { data },
    {
      onSuccess: () => trackIdentity(TrackUserPreferencesMapper(data)),
    },
  );
```

## 5. Wrapper that composes another hook (auth)

`features/auth/login/queries/login-apple.query.ts:6-21`: the wrapper performs `login({ accessToken, refreshToken })` itself and returns only `{ isPending, mutateAsync }`. `login-google.query.ts` chains the Google provider sign-in, throws plain `Error`s when no user/email, then the backend call.

## 6. Cache surgery (chat only)

`features/chat-room/queries/chat-room-message-queue/delete-message.query.ts:14-67`: no `onSuccess`; the wrapper marks the message `DELETED` with `queryClient.setQueryData` on `getConversationsLoadMoreMessagesQueryKey(chatRoomId ?? '', { limit: 10 })` (line 29, hard-coded `10` = `LIMIT_MESSAGES`), removes a failed optimistic message from its store, then toasts. It is the only mutation wrapper that uses `useToast` itself.

## 7. Call-site patterns

Minimal confirm dialog, `features/profil/components/profil-header/profil-header-actions/profil-header-actions-block-user.component.tsx:19-34`:
```ts
const { isPending: isLoadingBlockUser, mutateAsync: blockUser } = useBlockUser(userId ?? '');
const { trackError, trackEvent } = useAnalytics();

const handleBlockUser = async () => {
  try {
    await blockUser();
    trackEvent({ eventName: BLOCK_USER_EVENT });
    router.dismissAll();
    toast({
      message: t('profil.block_user_success_message', { name: `${firstname} ${lastname}` }),
      variant: 'success',
    });
  } catch (error) {
    trackError({ error });
  }
};
```
`BLOCK_USER_EVENT` is a module const (`ANALYTICS_EVENTS.PROFIL.PROFIL_HEADER_ACTIONS_BLOCK_USER`, line 12). `isLoading` is wired into `DialogConfirm isLoading` with `onConfirmPromise={handleBlockUser}`.

Specific backend error before the generic path, `features/chat-room-info/components/chat-room-info-session-actions.component.tsx:36-56`:
```ts
} catch (error) {
  const errorResponse = error as ErrorResponse;
  if (errorResponse.api_error_detail === ERROR_SESSION_STARTED) {
    toast({ message: t('chat-room.error_session_already_started'), variant: 'warning' });
    return;
  }
  trackEvent({
    data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error', session_uid: sessionUid },
    eventName: ANALYTICS_EVENTS.SESSION.SESSION_LEFT_FAILED,
  });
  trackError({ error });
}
```
`ERROR_SESSION_STARTED` is a local string const (line 22), not from `API_ERRORS`.

Register flow: failed event always, then toast for a known error and `trackError` only otherwise (`features/auth/register/screens/register-step-2.screen.tsx:51-69`; the match is a local `EMAIL_ALREADY_EXISTS_ERROR_MESSAGE = 'User already exists'`, line 20, which duplicates `API_ERRORS.USER_ALREADY_EXISTS` in `api/utils/api.errors.ts:11`).

Success path with a returned uid, `features/create-session/components/create-session-footer/create-session-footer-button-create-session.component.tsx:48-78`: `const response = await createSession(sessionData); setCreatedSessionUid(response?.data?.uid);` then `trackEvent`, navigate; catch sends `create_session_failed` with `response.api_error_detail || 'unknown_api_error'` then `trackError`.

Failure still invalidates (stale detail after a race), `features/session/components/session-footer.component.tsx:102-109`: the component instantiates `useInvalidateSessionsFindOne()` (line 35) and calls `invalidateSessionById(sessionUid)` in the catch before `trackError`. It also picks the event by branch: `isSwitching ? 'session_team_switch_failed' : 'session_joined_failed'`.

## 8. Inconsistencies

- Several call sites use string-literal event names (`'session_joined'`, `'create_session_completed'`, `'signup_success'`, `'profil_edit_name_success'`) instead of `ANALYTICS_EVENTS.X.Y`. SKILL.md requires the constant; use it in new code.
- `features/settings/components/settings-blocked-users/.../settings-blocked-users-list-item.component.tsx` and `settings-actions-delete-account-action.component.tsx` have no semicolons and the former uses un-namespaced Tolgee keys; do not copy their formatting.
- `useBlockUser` call site shows `trackEvent` only on success; no `_failed` event (SKILL.md section 8 asks for one on user-triggered mutations).
