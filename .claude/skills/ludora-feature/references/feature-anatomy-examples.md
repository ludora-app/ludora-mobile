# Feature anatomy: 4 real archetypes

Real folder trees and entry points of the reference features named in SKILL.md §2. Trees are trimmed to what matters; line refs were read from the repo.

## Caveat first: the references themselves drift

Copy the shape, not the details. Verified drift in the reference files (see `ludora-code-style/references/known-drift.md`):
- `settings-favorites` does **not** exist as a feature folder: it lives in `src/features/settings/` and is still work in progress (its route `ROUTES.SETTINGS.FAVORITES` is not linked from `settings.screen.tsx`, and its list reads the history-filtered `useGetSessionsMe`, `settings-favorites-list.component.tsx:24`). Prefer `settings-blocked-users` or `players` as list models.
- `players` uses `estimatedItemSize` and `@/components/ludo-ui` (`players-list.component.tsx:4,79`); use `getFixedItemSize` and `@ludo/ui` instead.

## 1. List: `players` (paginated, filter store, per-item action)

```
src/features/players/
  screens/players.screen.tsx                      ScreenLayout + <PlayersList />  (12 lines)
  components/players-list/
    players-list.component.tsx                    owns List + data + context value
    players-list-headers/ ...-header-sticky, ...-header-top-list
    players-list-item/    ...-item, ...-item-banner, ...-item-invite
  context/players-list.context.ts                 stable callbacks for items
  queries/get-users-suggestion.query.ts           raw Orval infinite hook (10 lines)
  queries/get-users-suggestion-by-filter.query.ts store filters -> params -> items
  queries/send-friend-invitation.query.ts         mutation + invalidation
  stores/players-filters.store.ts                 filters + numberOfFilters + reset
  utils/players-filters-mapper.utils.ts
route: src/app/(root)/(tabs)/players.tsx          2-line re-export
```

Open first: `players.screen.tsx`, then `players-list.component.tsx`, then the two queries.

Specific to this shape:
- Two-layer query: a thin Orval wrapper (`get-users-suggestion.query.ts:5-10`, only `getNextPageParam: lastPage => lastPage?.data?.nextCursor`) and a `...-by-filter` hook that reads the store, builds `params` with `useMemo`, tracks errors with `useGetMethodErrorTracking`, flattens pages and returns `{ error, isError, items, totalCount, ...rest }` (`get-users-suggestion-by-filter.query.ts:12-32`). `LIMIT_RESULTS_PLAYERS = 10` is a module constant (line 10).
- Items get their callbacks through a context instead of props: `PlayersListProvider` / `usePlayersListContext` (`players-list.context.ts:12-13`), with `onInvite` and `t` kept stable via refs (`players-list.component.tsx:27-56`). This is an optimisation for virtualised rows, not something every list needs.
- Store pattern: `interface PlayersFiltersStore` with `reset` registered in `reset-caches.utils.ts` (see walkthrough).
- Mutation: `useSendFriendInvitation` wraps `useFriendsCreate`, invalidates in `onSuccess` and re-exposes `mutateAsync(receiverUid)` (`send-friend-invitation.query.ts:5-28`). The caller catches and calls `trackError` (`players-list.component.tsx:43-49`).

Cleaner small list to copy for a non-paginated screen: `settings-blocked-users`:
```
src/features/settings/
  screens/settings-blocked-users.screen.tsx
  components/settings-blocked-users/
    settings-blocked-users-list.component.tsx     List config, EMPTY_RESULT_PROPS (lines 12-21, 29-48)
    settings-blocked-users-header.component.tsx   <SettingsHeader titleKey=... /> in memo()
    settings-blocked-users-list-item/ ...-item.component.tsx, ...-item-skeleton.component.tsx
  queries/get-blocked-users.query.ts              9 lines, `{ ...rest, items }`
  queries/unblock-user.query.ts                   3 invalidations in onSuccess (lines 13-21)
route: src/app/(root)/settings/blocked-users.ts
```
`List` here passes `getFixedItemSize={GET_FIXED_ITEM_SIZE}` (line 46), `SkeletonComponent`, `emptyResultProps` and no-op pagination props (lines 13-14, 31-33) because the endpoint is not paginated. Its item (`...-list-item.component.tsx`) is semicolon-free, so do not copy its formatting.

## 2. Form sheet: `profil` formsheets

```
src/features/profil/
  formsheets/profil-edit-{name,bio,birthdate,email,password,sex}.formsheet.tsx
  schemas/profil-edit-<x>.schema.ts               schema factory taking `t`
  components/profil-edit/profil-edit-footer.component.tsx   shared submit footer
  queries/update-user-me-email.query.ts, update-user-password.query.ts
routes:  src/app/(root)/profil/profil-edit/name.ts  -> re-exports the formsheet
layouts: name="profil/profil-edit/name" in (root)/_layout.tsx:40 and _layout.ios.tsx:39
```

Open first: `profil-edit-name.formsheet.tsx` (95 lines, the canonical small one) and `profil-edit-name.schema.ts`.

What is specific:
- Schema is a factory: `export const profilEditNameSchema = (t: TolgeeInstance['t']) => z.object({...})` (`profil-edit-name.schema.ts:6-10`), used as `const schema = profilEditNameSchema(t)` and `useForm<z.infer<typeof schema>>` (formsheet lines 25-26).
- Form skeleton: `useForm({ defaultValues, mode: 'onChange', resolver: zodResolver(schema) })` (lines 26-33), `const onSubmit = async (data) => {}` (35), `FormSheetHeader` + `Wrapper` + `FormInput` + `ProfilEditFooter handleSubmit={handleSubmit(onSubmit)}` (75-93).
- No-change shortcut: `router.back()` when nothing changed (36-39).
- Mutation result renamed `{ isPending: isUpdatingUserMe, mutateAsync: updateUserMe }` (22). Shared mutations (`useUserMe`, `useUpdateUserMe`) live in `src/queries/` because several features use them.
- Success and failure are both tracked: `profil_edit_name_success` with data (44-47), `profil_edit_name_failed` with `error_message` (68-71). Typed in `src/constants/analytics-events.constants.ts` (keys at 85-86, payload types at 262 and 285).
- Sheet options exist in both layouts. Note they are not identical: `_layout.tsx` has `sheetCornerRadius: 12`, `_layout.ios.tsx` does not.

## 3. Multi-step: `create-session`

```
src/features/create-session/
  screens/create-session-step-{1..5}.screen.tsx   one screen per step
  components/
    create-session-header/ (progress stepper)    create-session-footer/ (per-step buttons)
    create-session-steps/create-session-step-1/part-1..4/ ...-item.component.tsx
    create-session-steps/create-session-step-2/ (fields list, field card, availabilities)
  hooks/create-session-step.hook.ts               activeStep from pathname
  store/create-session.store.ts                   wizard state (folder is `store/`, see drift)
  store/create-session-filters-fields.store.ts, create-session-layout.store.ts
  formsheets/create-session-step-3-payment/, ...step-2-session-public-field-duration/
  queries/ schemas/ types/ utils/ constants/
routes: src/app/(root)/create-session/{_layout.tsx,step-1.ts ... step-5.ts}
```

Open first: `app/(root)/create-session/_layout.tsx` (header + Stack + footer, 21 lines), `create-session.store.ts`, `create-session-step-1.screen.tsx`, `create-session-footer-button-next-step.component.tsx`.

What is specific:
- Header and footer live in the **route layout**, not in each screen (`_layout.tsx:15-19`), so they persist between steps. The footer picks buttons by `activeStep` (`create-session-footer.component.tsx:12-14`).
- `activeStep` is derived from the pathname by `useGetCreateSessionStep` (`create-session-step.hook.ts:4-16`), with a render-time state adjust as fallback (lines 10-13).
- One wizard store: `session: Partial<CreateSessionFromRequestDto & { additionalData }>`, a merging `setSession`, `reset`, and `isStep3Valid` flag (`create-session.store.ts:4-55`). Per-step validity is computed with selectors in the footer button (`...button-next-step.component.tsx:28-41`).
- Reset: step 1 resets both stores on unmount with `useResetStoreOnUnmount(reset)` (`create-session-step-1.screen.tsx:48-53`, helper in `src/utils/navigation.utils.ts:7`). Both stores are also in `reset-caches.utils.ts`.
- Selectors that return objects use `useShallow` (screen line 26-33).
- Step 1 is split into `part-N` folders, each `part-N.component.tsx` + `part-N-item.component.tsx`.
- The route type for the duration sheet is in `src/types/routes-params.types.ts` (`ROUTES.CREATE_SESSION.STEP_2_DURATION_FORM_SHEET`).

## 4. Detail screen: `session`

```
src/features/session/
  screens/session.screen.tsx, session-joined.screen.tsx
  components/session-section/session-section-{teams,details,tags,description,creator,images,field-detail}/
  components/session-teams/session-teams-list/ (teams list with section header, separator, join item)
  components/session-footer.component.tsx
  formsheets/session-teams.formsheet.tsx
  queries/get-session-teams.query.ts, join-session.query.ts
  stores/session-team.store.ts
  types/session.types.ts
routes: src/app/(root)/session/[id]/{index.tsx,session-joined.ts,session-teams.ts}
```

Open first: `session.screen.tsx` (97 lines), `types/session.types.ts`, `src/queries/get-session-by-id.query.ts`.

What is specific:
- Typed params: `useLocalSearchParams<SessionScreenLocalSearchParams>()` (`session.screen.tsx:35`), where the type is `RootStackParamList[typeof ROUTES.SESSION.INDEX]` (`session.types.ts:4`), itself declared in `src/types/routes-params.types.ts` (`[ROUTES.SESSION.INDEX]: { id: string }`).
- The query is shared (`src/queries/get-session-by-id.query.ts`, used by several features): `enabled: !!id`, no retry on 404, 404 mapped to `data: undefined`, error tracking skipped for 404 (lines 6-30).
- Screen states, in order: loading -> `<Loading />` (45), absent and not refetching -> `<Redirect href={ROUTES.NOT_FOUND.INDEX} />` (49), then render (57+).
- The screen is a vertical list of `SessionSection*` components that each receive `session` and own their layout, separated by `<Separator />` and `{/* SECTION n : ... */}` markers (68-91).
- Store cleanup with `useResetStoreOnUnmount(reset)` (43).
- Pull to refresh via `ScrollView hasRefreshControl refetch={...}` (61-66).
- Drift in this file: `export interface SessionScreenProps` with `sport: any` (22-30) is unused by the component. Do not copy.
