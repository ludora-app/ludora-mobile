# Known drift: where the "don't copy" patterns still live

Each item of SKILL.md §8, checked with grep on `src/` (excluding `src/components/chill-ui-library/` and `src/api/generated/`, which are not ours to restyle). Use this to know what to avoid when copying a neighbouring file, or to find files worth fixing when you are already editing them. Counts are as of this check; max 5 paths per item.

## Still present

**`interface XProps`** (61 files). Use `type XProps = {}`.
- `src/providers/stripe.provider.tsx`
- `src/providers/query.provider.tsx`
- `src/features/filters/filters/components/filter-sports/filter-sports.component.tsx`
- `src/features/filters/filters/components/filter-modes/filter-modes-item.component.tsx`
- `src/features/create-session/components/create-session-footer/create-session-footer-button-next-step.component.tsx:10`

Also `export interface SessionScreenProps` with `sport: any`, unused (`src/features/session/screens/session.screen.tsx:22`).

**`TouchableOpacity`** (6 files). Use the `@ludo/ui` pressables.
- `src/features/filters/filters-addresses/components/filter-addresses-list-header.component.tsx`
- `src/features/filters/filters-addresses/components/filter-addresses-result-item/filter-addresses-result-item.component.tsx`
- `src/features/profil/components/profil-section/profil-section-5/profil-section-5-list-segmented-control.component.tsx`
- `src/features/profil/components/profil-section/profil-section-4/profil-section-4.component.tsx`
- `src/features/image-picker/screens/image-picker.screen.tsx`

**`Platform.OS`** (7 files, one is `src/constants/platform.constants.ts` where it is the definition and is fine). Use `IS_IOS` / `IS_ANDROID`.
- `src/hooks/app-state.hook.ts:42`
- `src/hooks/user-location.hook.ts:37`
- `src/hooks/image-picker.hook.ts:75`
- `src/services/push-notification.service.ts:69`
- `src/utils/app-version-check/getStoreUrl.ts:53`

(`src/features/chat-room/hooks/chat-room-message-actions-menu-position.ts:31` also.)

**`store/` folder** (4 folders; the standard is `stores/`).
- `src/features/create-session/store/`
- `src/features/chat/store/`
- `src/features/chat-room/store/`
- `src/features/filters/filters/store/`

Imports of these paths are spread across the app; rename only as a dedicated change.

**`.query.tsx`** (6 files; use `.query.ts`).
- `src/features/create-session/queries/get-fields.query.tsx`
- `src/features/create-session/queries/get-fields-by-filter.query.tsx`
- `src/features/home/queries/get-sessions.query.tsx`
- `src/features/auth/login/queries/login.query.tsx`

(also `home/queries/get-sessions-by-filter.query.tsx`, `home/queries/get-incomming-session-me.query.tsx`.)

**Untyped `useLocalSearchParams()`** (6 hits; type it with a `RootStackParamList` alias).
- `src/features/profil/screens/profil.screen.tsx:21`
- `src/features/profil/components/profil-header/profil-header-actions/profil-header-actions.component.tsx:17`
- `src/features/profil/components/profil-section/profil-section-5/profil-section-5-list/profil-section-5-list.component.tsx:39`
- `src/features/profil/components/profil-section/profil-section-3/profil-section-3-user.component.tsx:23`
- `src/features/auth/forgot-password/new-password/screens/new-password.screen.tsx:21`

**String-literal routes** (5 hits; use `ROUTES`).
- `src/features/profil/components/profil-header/profil-header-actions-me.component.tsx:20` (`href="/settings"`)
- `src/features/profil/components/profil-edit/profil-edit-avatar.component.tsx:81` (`pathname: '/image-picker'`)

**`src/hooks/navigation.hook.ts`** still exists next to `navigation.hooks.ts`; both export `useDisableBack`. One importer of the old file remains: `src/features/auth/forgot-password/reset-password/screens/reset-password.screen.tsx:9`. Import from `@/hooks/navigation.hooks`.

**`estimatedItemSize` on List** (1 file). Use `getFixedItemSize`.
- `src/features/players/components/players-list/players-list.component.tsx:17,79`

**`useFlatlistHook`**: the file `src/features/invite-friends/hooks/useFlatlistHook.ts` still exists (camelCase file name, no `.hook.ts` suffix; it exports `useCustomFlatListHook`, line 21). No importer was found by grep, so it is probably dead code; confirm before deleting. It also holds French comments (lines 29, 34, 53).

**Primitives imported from `@/components/ludo-ui`** (13 files outside the lib; use `@ludo/ui`).
- `src/features/players/screens/players.screen.tsx`
- `src/features/players/components/players-list/players-list.component.tsx:4`
- `src/features/profil/formsheets/profil-edit-birthdate.formsheet.tsx`
- `src/features/auth/register/screens/register-step-2.screen.tsx`
- `src/features/chat-room/screens/chat-room.screen.tsx`

**Primitives imported from `@chillui/ui`** (13 files import `Box`, `Wrapper`, `Avatar`, etc.; hooks like `useToast` and `cn` are fine from there, see the formsheet example).
- `src/features/auth/register/screens/register-step-2.screen.tsx:4`
- `src/features/auth/forgot-password/components/content-wrapper/content-wrapper.component.tsx:1`
- `src/features/auth/forgot-password/new-password/screens/new-password.screen.tsx:2`
- `src/features/legal/components/legal-header.component.tsx:3`
- `src/components/ui/sport-level-card.component.tsx:5`

**Files without semicolons** (64 files). Entire folders: `src/features/legal/` (`screens/legal-cgu-mentions.screen.tsx`, `legal-privacy.screen.tsx`, `legal-cgv.screen.tsx`, `legal-non-discrimination.screen.tsx`, `components/legal-section-title.component.tsx`). Partially: `src/features/settings/screens/settings-blocked-users.screen.tsx`, `settings-favorites.screen.tsx`, `src/features/my-fields/screens/my-fields.screen.tsx`, `src/features/players/screens/players.screen.tsx`, and the blocked-users list item. `bun lint:fix` will NOT add the semicolons: `'prettier/prettier': 'error'` is commented out at `eslint.config.js:67`, so ESLint does not run Prettier. Format the files you touch with `npx prettier --write <file>` (script `bun format` runs it on the whole repo; avoid that in a feature PR).

**French comments** (at least 14 files). Write new comments in English.
- `src/features/chat/utils/date.utils.ts:6,24`
- `src/features/invite-friends/hooks/useFlatlistHook.ts:29`
- `src/stores/auth.store.ts:31,34`
- `src/utils/image-picker.utils.ts:35`
- `src/types/routes-params.types.ts:85`

(Also `src/utils/navigation.utils.ts:4`, the JSDoc of `useResetStoreOnUnmount`.)

## No longer present (do not hunt for them)

- **Misnamed files** `… copy.ts`, `invite-friends-query.ts`, `register.hook.tsx`: none found. The only `*copy*` match is `chat-room-message-actions-item-copy-message.component.tsx`, which is a legitimate "copy message" action.

## Findings about the guidance itself

- SKILL.md §1 says a blank line starts a new interface partition. With the current config only comments partition (see `lint-rules-in-practice.md`), so a blank line changes nothing.
- The reference files named in `ludora-feature` carry drift themselves: `players` (estimatedItemSize, ludo-ui import) and `settings-favorites` (no semicolons, reads `useGetSessionsMe`).
- Grep patterns used: `^(export )?interface \w+Props\b`, `TouchableOpacity`, `Platform\.OS`, `useLocalSearchParams\(\)`, `from '@/components/ludo-ui`, `estimatedItemSize`, and a per-file check for any line ending in `;`. Re-run them to refresh this list.
