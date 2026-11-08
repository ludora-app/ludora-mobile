# Route map (src/app)

Real route tree with the screen each file re-exports and how it is presented on Android/default (`(root)/_layout.tsx`) and iOS (`(root)/_layout.ios.tsx`).
Read it before adding a route, to find the closest existing sibling to copy, or when a sheet looks different between platforms.

Legend: **push** = no `Stack.Screen` entry, inherits `screenOptions` (`animation: 'slide_from_right'` Android `_layout.tsx:13-16`, `'ios_from_right'` iOS `_layout.ios.tsx:13-16`). Targets are under `@/features/`. "sheet fit" = `formSheet` + `sheetAllowedDetents: 'fitToContents'`; "sheet .93" = `formSheet` + `[0.93]`. Android sheets always carry `sheetCornerRadius: 12`, iOS ones never do (documented difference).

## Root stack (`src/app/_layout.tsx`)

| Route file | Re-exports | Presentation |
|---|---|---|
| `(root)/` | authed stack | `Stack.Protected guard={!!isAuthenticated}` (`_layout.tsx:50-52`) |
| `auth/` | unauthed stack | `Stack.Protected guard={!isAuthenticated}` (`_layout.tsx:53-55`) |
| `dev-tools.tsx` | `dev-tools/screens/dev-tools.screen` | formSheet `[0.9]`, `slide_from_bottom` (`_layout.tsx:56-67`) |
| `storybook.tsx` | `dev-tools/screens/storybook.screen` | `modal` + custom `StorybookHeader` (`_layout.tsx:68-79`) |
| `app-check.ts` | `app-check/modal/app-check.modal` | `transparentModal`, `fade` (`_layout.tsx:80-93`) |
| `+not-found.tsx` | `not-found/screens/not-found-screen` | file-based not-found |
| `legal/{cgu-mentions,cgv,non-discrimination,privacy}.ts` | `legal/screens/legal-*.screen` | push (no `legal/_layout`, no entry) |

## Auth (`auth/_layout.tsx`: plain Stack, `initialRouteName="index"`)

| Route file | Re-exports | Presentation |
|---|---|---|
| `auth/index.tsx` | `welcome/screens/welcome.screen` | push |
| `auth/login.tsx` | `auth/login/screens/login.screen` | push |
| `auth/reset-password.tsx`, `verify-code.tsx` | `auth/forgot-password/{reset-password,verify-code}/screens/*` | push |
| `auth/new-password.tsx` | `auth/forgot-password/new-password/screens/new-password.screen` | push, `gestureEnabled: false` (`auth/_layout.tsx:16`) |
| `auth/register/step-{1,2}.tsx` | `auth/register/screens/register-step-{1,2}.screen` | push inside `register/_layout.tsx` (bare Stack, no header/footer) |

## Authed stack `(root)/`

Both layouts: `initialRouteName="(tabs)"`, then `<PushNotificationsInitializer />` and `<OnBoardingInitializer />` beside `AppLayoutNav` (`_layout.tsx:234-241`, `_layout.ios.tsx:214-221`).

| Route file | Re-exports | Android | iOS |
|---|---|---|---|
| `(tabs)/index.ts` | `home/screens/home.screen` | tabs | tabs |
| `(tabs)/{messages,players}.tsx` | `chat/screens/chat.screen`, `players/screens/players.screen` | tabs | tabs |
| `(tabs)/profil.tsx` | `profil/screens/profil.screen` | tabs | tabs |
| `(tabs)/create-session.tsx` | `create-session/screens/create-session-step-1.screen` | tabs | tabs |
| `create-session/step-{1..5}.ts` | `create-session/screens/create-session-step-N.screen` | `slide_from_bottom` + `statusBarStyle: 'dark'` (L19-25) | `slide_from_bottom` only (L19-24) |
| `on-boarding/profile/step-{1,2}.ts` | `on-boarding/on-boarding-profile/screens/on-boarding-step-{1,2}.screen` | push (no entry) | push |
| `on-boarding/sessions/{ready,suggestions,joined}.ts` | `on-boarding/on-boarding-sessions/screens/on-boarding-sessions-*.screen` | push (no entry; options in `on-boarding/_layout.tsx`) | push |
| `profil/[id]/index.ts` | `profil/screens/profil.screen` | push | push |
| `profil/[id]/actions.tsx` | `profil/formsheets/profil-actions.formsheet` | sheet fit (L27-36) | sheet fit (L27-35) |
| `profil/profil-edit/index.ts` | `profil/screens/profil-edit.screen` | push | push |
| `profil/profil-edit/{name,bio,birthdate,sex,email,password}.ts` | `profil/formsheets/profil-edit-*.formsheet` | sheet fit (L39-98) | sheet fit (L38-91) |
| `filters/index.ts` | `filters/filters/screens/filters.screen` | sheet .93, default animation (L101-110) | `modal` + `slide_from_bottom` (L94-103) |
| `filters/filters-addresses.ts` | `filters/filters-addresses/screens/filters-addresses.screen` | sheet .93 + `slide_from_bottom` + `paddingBottom: bottom` (L111-121) | `modal` + `slide_from_bottom` + `paddingBottom: bottom` (L104-112) |
| `filters/filters-calendar.ts` | `filters/filters-calendar/screens/filters-calendar.screen` | sheet fit + `slide_from_bottom` + `paddingBottom: bottom` (L122-132) | sheet fit + `slide_from_bottom`, no `paddingBottom` (L113-122) |
| `session/[id]/index.tsx` | `session/screens/session.screen` | push | push |
| `session/[id]/session-joined.ts` | `session/screens/session-joined.screen` | push | push |
| `session/[id]/session-teams.ts` | `session/formsheets/session-teams.formsheet` | sheet .93 + `slide_from_bottom` (L135-145) | `modal` + `slide_from_bottom` (L125-133) |
| `public-field-duration.ts` | `create-session/formsheets/.../create-session-step-2-session-public-field-duration.formsheet` | sheet fit (L146-155) | sheet fit (L134-142) |
| `on-boarding-sport.ts` | `on-boarding/formsheets/on-boarding-sport.formsheet` | sheet fit, `sheetCornerRadius: 30` (L158-167) | sheet fit (L145-153) |
| `chat-room/[chatRoomId]/index.ts` | `chat-room/screens/chat-room.screen` | `statusBarStyle: 'dark'` (L170-177) | explicit `ios_from_right` (L156-162) |
| `chat-room/[chatRoomId]/info/{private,session}.ts` | `chat-room-info/screens/chat-room-info-{private,session}.screen` | push inside `[chatRoomId]/_layout.tsx` Stack (`slide_from_right`) | same |
| `chat-room/user-profile/[userId].ts` | `chat-room/formsheets/chat-room-user-profile.formsheet` | sheet fit (L178-187) | sheet fit (L163-171) |
| `notifications.ts` | `notifications/screens/notifications.screen` | push (entry only sets `headerShown: false`, L190-195) | same (L174-179) |
| `invite-friends/[sessionId]/index.ts` | `invite-friends/screens/invite-friends.screen` | push + `slide_from_bottom` (L198-205) | `modal`, no animation (L182-189) |
| `image-picker.ts` | `image-picker/screens/image-picker.screen` | sheet fit + `slide_from_bottom` (L208-218) | sheet fit, no animation (L192-200) |
| `my-fields/index.ts` | `my-fields/screens/my-fields.screen` | push | push |
| `my-fields/add.ts` | `my-fields/formsheets/my-fields-add.formsheet` | sheet .93 (L221-229), no `headerShown: false` | `modal` (L203-209), no `headerShown: false` |
| `settings/{index,blocked-users,contact,faq,favorites,friends,history,planning,preferences}.ts` | `settings/screens/settings*.screen` (`history` -> `settings-sessions-history.screen`) | push | push |

All sheets listed also set `contentStyle: { backgroundColor: '#FFF' }` and `headerShown: false` in both files unless noted.

## Options that differ beyond the documented iOS rules

Documented rules = no `sheetCornerRadius`, tall sheets `modal` vs `formSheet [0.93]`, `ios_from_right` vs `slide_from_right`. Everything below goes further and is easy to break when you "sync" the two files by copy-paste:

- `create-session`: `statusBarStyle: 'dark'` is Android-only.
- `chat-room/[chatRoomId]`: Android adds `statusBarStyle: 'dark'` and `headerShown: false`; iOS instead repeats `animation: 'ios_from_right'` (redundant with `screenOptions`).
- `filters/index`: iOS is `modal` but still carries `sheetCornerRadius: 12` (`_layout.ios.tsx:101`), which breaks the "iOS never has it" rule (likely a no-op for `modal`). iOS also adds `slide_from_bottom`, Android does not.
- `filters/filters-addresses`: iOS keeps `paddingBottom: bottom` (L108) although the checklist says only Android sheets need it.
- `filters/filters-calendar`: iOS drops `paddingBottom: bottom`.
- `invite-friends/[sessionId]`: Android is a plain push animated from the bottom; iOS is a real `modal`.- `image-picker`: `slide_from_bottom` is Android-only.
- `on-boarding-sport`: Android uses `sheetCornerRadius: 30`, not the usual `12`.
- `my-fields/add`: neither file sets `headerShown: false` here (inherited from `screenOptions`), unlike every other sheet.

## Oddities

- `(tabs)/create-session.tsx` and `create-session/step-1.ts` re-export the same step-1 screen (two aliases, two import names: `CreateSessionScreenStep1` vs `CreateSessionStep1Screen`).
- `profil/[id]/actions.tsx`, `(tabs)/profil.tsx` and `+not-found.tsx` are `.tsx` with double quotes and/or no semicolon, unlike the `.ts` single-quote convention.
- `Stack.Screen name` mixes styles: `filters/index` and `invite-friends/[sessionId]/index` carry the `/index` suffix, while `create-session`, `chat-room/[chatRoomId]` and `my-fields/add` are folder or file names. Copy the style of the sibling you extend.
