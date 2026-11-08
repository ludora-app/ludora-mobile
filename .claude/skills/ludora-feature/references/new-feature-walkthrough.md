# Walkthrough: add a small list feature

A concrete order of work for a new paginated list screen (optionally with an add form sheet), each step pointing at the real file to copy. No code is repeated here: open the file, copy its shape, rename. `<f>` is your kebab-case feature name.

Best templates, all in `src/features/`:
- `my-fields/`: list + FAB + add form sheet (closest to "small list feature"). Route `src/app/(root)/my-fields/{index,add}.ts`.
- `settings/` blocked users: non-paginated list with skeleton and dialog action.
- `players/`: paginated list with filter store and per-item mutation.

## Step 0. Explore

1. Open the template folders above and `src/components/ui/` (SessionCard, EmptyResult, HeaderOutlined, FormSheet*) before writing a component.
2. Find the generated hook: `ls src/api/generated/api/<tag>/` (gitignored, regenerate with `bun generate:api` if missing). Invalidators are in `src/api/generated/invalidate-queries`.

## Step 1. Query wrappers (`features/<f>/queries/`)

| Need | Copy from |
| --- | --- |
| Infinite list with filter store | `my-fields/queries/get-my-fields.query.ts` (store -> `filterObjectEntries` -> `useMemo` params -> `...Infinite` hook with `getNextPageParam: lastPage => lastPage?.data?.nextCursor` -> `useGetMethodErrorTracking` -> flatten pages). `LIMIT = 10` as module const. |
| Same, with a raw/by-filter split | `players/queries/get-users-suggestion.query.ts` + `get-users-suggestion-by-filter.query.ts` |
| Non-paginated list | `settings/queries/get-blocked-users.query.ts` |
| Mutation with invalidation | `settings/queries/unblock-user.query.ts` (3 `useInvalidate*` called in `onSuccess`) or `players/queries/send-friend-invitation.query.ts` |

File names are `<verb>-<thing>.query.ts` with a `.ts` extension (not `.tsx`). Details: ludora-data.

## Step 2. Store, only if state is shared

Copy `my-fields/stores/my-fields-filter.store.ts` (filter + `setFilter` + `reset`). Folder is `stores/` (create-session's `store/` is drift). Skip it when a `useState` is enough.

## Step 3. Screen and components

1. Screen: copy `settings/screens/settings-blocked-users.screen.tsx` or `my-fields/screens/my-fields.screen.tsx` (a `ScreenLayout` wrapping `<XList />`). Add semicolons and import from `@ludo/ui`; several of these files omit semicolons.
2. List component: copy `settings/components/settings-blocked-users/settings-blocked-users-list.component.tsx` for the `List` props (fixed item size, `SkeletonComponent`, `emptyResultProps`, `hasRefreshControl`). For pagination props use `my-fields/components/my-fields-list/my-fields-list.component.tsx` or `settings-favorites-list.component.tsx:24-26` (`fetchNextPage`, `hasNextPage`, `isFetchingNextPage`).
3. Header: `settings-blocked-users-header.component.tsx` (memo + `SettingsHeader`/`HeaderOutlined`, `titleKey`).
4. Item + skeleton: `settings-blocked-users-list-item/` (both files). Item action pattern: `handleX` with `try { await mutate(); trackEvent(...) } catch (error) { trackError({ error }) }`.
5. FAB, if any: `my-fields/components/my-fields-list/my-fields-list-fab.component.tsx`.

## Step 4. Form sheet, if the feature adds or edits

Copy `profil/formsheets/profil-edit-name.formsheet.tsx` + `profil/schemas/profil-edit-name.schema.ts` (or `my-fields/formsheets/my-fields-add.formsheet.tsx` and `my-fields/schemas/create-field.schema.ts`). Submit footer: `profil/components/profil-edit/profil-edit-footer.component.tsx`.

## Step 5. Route

1. Constant: add to `ROUTES` in `src/constants/routes.constants.ts` (default export, keys alphabetical; e.g. `MY_FIELDS: { ADD, INDEX }` at line 60). Dynamic routes also get a `..._UID: (uid) =>` helper (see `SESSION`, line 88).
2. Re-export file in `src/app/(root)/<f>/index.ts`, shaped like `src/app/(root)/settings/blocked-users.ts` (import the screen via `@/features/...`, `export default`). Nothing else in it.
3. Sheet or modal only: add a `<Stack.Screen name="<f>/add" options={{ contentStyle, headerShown: false, presentation: 'formSheet', sheetAllowedDetents: 'fitToContents' }} />` in **both** `src/app/(root)/_layout.tsx` and `src/app/(root)/_layout.ios.tsx` (see `profil/profil-edit/name` at lines 40 and 39, `my-fields/add` at 210 and 193). Plain pushed screens (like `my-fields/index`) need no entry. Check whether the `_layout.tsx` copy has extras the iOS one lacks (`sheetCornerRadius: 12`).
4. Params: add `[ROUTES.<F>.<X>]: { ... }` to `RootStackParamList` in `src/types/routes-params.types.ts`, then alias it in `features/<f>/types/<f>.types.ts` as in `features/session/types/session.types.ts`, and type `useLocalSearchParams<...>()`.
5. Entry point: link it from an existing screen (e.g. the `SETTINGS_MENU` array in `src/features/settings/screens/settings.screen.tsx`, which takes `description`, `iconName`, `id`, `label`, `route`).

Navigation rules: ludora-navigation.

## Step 6. Analytics (`src/constants/analytics-events.constants.ts`)

1. Add success and failed names to the right group of `ANALYTICS_EVENTS` (`PROFIL` group starts at line 76, `SETTINGS` ends at line 111), keys alphabetical.
2. If the event carries data, add its payload to `AnalyticsEventData` (starts line 115): `error_message: string` for `_FAILED`, see `PROFIL_EDIT_NAME_FAILED` (line 262) and `..._SUCCESS` (line 285). Events without an entry accept free-form `data` (see `AnalyticsEventWithDataType`, line 328).
3. Call sites: `trackEvent({ data, eventName })` on success, `trackError({ error })` plus the failed event in `catch` (`profil-edit-name.formsheet.tsx:44-47,66-71`). Note naming drift: a few settings events use a `settings:` prefix (lines 107-110), most do not; follow the surrounding group.

## Step 7. Done-checklist -> files that must change

| Checklist item | File(s) |
| --- | --- |
| New store has `reset()` and is registered | `src/utils/reset-caches.utils.ts`: import `useXStore` (imports are line-length sorted) and add `useXStore.getState().reset();` in `resetCaches` (lines 24-45) |
| Store cleared when leaving the screen | `useResetStoreOnUnmount(reset)` from `src/utils/navigation.utils.ts:7` (used in `session.screen.tsx:43`) |
| New route | `src/app/(root)/<f>/*.ts`, `src/constants/routes.constants.ts`, `src/types/routes-params.types.ts`, both `(root)/_layout.tsx` and `_layout.ios.tsx` if sheet or modal |
| Analytics for user actions | `src/constants/analytics-events.constants.ts` + call sites |
| Mutation invalidations | the `*.query.ts` `onSuccess`, using `@/api/generated/invalidate-queries` |
| Icons | `bun generate:icons` (script `tools/svg-2-obj/index.js`, rewrites `src/constants/icons.constants.ts`); never inline SVGs |
| Strings | `t('feature.key')` everywhere; list new Tolgee keys with FR/EN text in your reply (`bun generate:translations:local` exists in `package.json`) |
| Loading, empty, not-found | `SkeletonComponent` + `emptyResultProps` in the list; `<Redirect href={ROUTES.NOT_FOUND.INDEX} />` for detail screens (`session.screen.tsx:49-51`) |
| Gate | `bun lint:fix && bun ts:check` |

## Not verifiable from the repo

Tolgee key naming per feature and the backend tag/hook names depend on the generated client and the Tolgee project; check `src/api/generated/` and existing keys (`grep -rn "settings.blocked_users" src`) before inventing names.
