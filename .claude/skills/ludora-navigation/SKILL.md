---
name: ludora-navigation
description: Use when adding or changing a route, screen, form sheet, modal, tab, layout, multi-step flow, route params, deep link, push-notification navigation, provider or initializer in the Ludora mobile app (Expo Router). Covers src/app re-export files, the duplicated (root) _layout.tsx / _layout.ios.tsx, ROUTES constants, RootStackParamList typing, which router verb to use, screen anatomy and where initializers/providers go.
---

# Ludora navigation & screens

## 1. Route tree

```
src/app/_layout.tsx            root Stack: FontProvider > MainProvider > MainInitializer + Stack.Protected guards
├─ (root)/                     authed stack — _layout.tsx (Android/default) AND _layout.ios.tsx
│  ├─ (tabs)/                  headless expo-router/ui Tabs + custom TabBarCustom
│  ├─ create-session/ on-boarding/   flow layouts: <Header/> <Stack/> <Footer/>
│  ├─ chat-room/[chatRoomId]/_layout.tsx   <ChatRoomProvider><Stack/></ChatRoomProvider>
│  └─ settings/ profil/ filters/ my-fields/ session/ invite-friends/ ...
├─ auth/ (+ register/)          unauthed stack
├─ legal/                       reachable logged in or out
└─ app-check, dev-tools, storybook
```

- Auth switching is **only** `Stack.Protected guard={!!isAuthenticated}` fed by `useAuthStore`. Flip the store (`useAuthHelpers().login/logout`); never redirect manually on login/logout.
- On-boarding gate: `OnBoardingInitializer` redirects to step-1 when status is INCOMPLETE.

## 2. Adding a route — checklist

1. **Route file** in `src/app/...`, kebab-case, **`.ts`**, re-export only:
   ```ts
   import SettingsFaqScreen from '@/features/settings/screens/settings-faq.screen';

   export default SettingsFaqScreen;
   ```
   Target suffix by presentation: `*.screen.tsx` (screen), `*.formsheet.tsx` in `features/<f>/formsheets/` (sheet), `*.modal.tsx` (transparent modal). Dynamic: `[param]` folder + `index.ts`.
2. **Declare options in BOTH `src/app/(root)/_layout.tsx` and `_layout.ios.tsx`** if it isn't a default push, under a banner comment `{/* ──────────── Section ──────────── */}`:
   - Form sheet (Android/default):
     ```tsx
     <Stack.Screen
       name="profil/profil-edit/name"
       options={{
         contentStyle: { backgroundColor: '#FFF' },
         headerShown: false,
         presentation: 'formSheet',
         sheetAllowedDetents: 'fitToContents',
         sheetCornerRadius: 12,
       }}
     />
     ```
   - iOS file: same but **no `sheetCornerRadius`**; tall sheets use `presentation: 'modal'` on iOS vs `formSheet` + `sheetAllowedDetents: [0.93]` on Android; stack animation `ios_from_right` (iOS) vs `slide_from_right` (Android). Android sheets may need `contentStyle.paddingBottom: bottom` from `useSafeArea()`.
3. **`ROUTES`** (`src/constants/routes.constants.ts`): areas and keys alphabetical, `INDEX` for area root, dynamic = pattern + builder:
   ```ts
   INFO_SESSION: '/chat-room/[chatRoomId]/info/session',
   INFO_SESSION_UID: (chatRoomId?: string) => `/chat-room/${chatRoomId}/info/session`,
   ```
   Multi-param builders take an object. Paths omit groups (except `TABS.*`). Flow steps `STEP_1..N`.
4. **Params** in `RootStackParamList` (`src/types/routes-params.types.ts`) keyed by the **pattern** constant: `[ROUTES.SESSION.INDEX]: { id: string }`. All values are strings (booleans `'true'`, objects JSON). Params returned to a caller go in `ReturnStackParamList`. Alias per feature in `features/<f>/types/<f>.types.ts`:
   ```ts
   export type SessionScreenLocalSearchParams = RootStackParamList[typeof ROUTES.SESSION.INDEX];
   ```
5. New **tab**: file in `(tabs)/`, member in `TabRouteNames`, entry in `TAB_ROUTES` (`tabs-routes.constants.ts`); index 0 is the centre button.

## 3. Passing & reading params

```ts
const params: InviteFriendsParams = { goBackPath: ROUTES.SESSION.INDEX_UID(uid), sessionData: serialize(session) };
router.navigate({ params, pathname: ROUTES.INVITE_FRIENDS.INDEX_UID(uid) });
```
```ts
const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
const session = useMemo(() => {
  if (!isString(sessionData)) return null;
  try {
    return parse(sessionData);
  } catch {
    return null;
  }
}, [sessionData]);
```
- Always typed `useLocalSearchParams<...>()`. Objects via `serialize`/`parse` (`@/utils/json.utils`).
- `_UID(undefined)` produces `'undefined'` in the URL — guard with `param !== 'undefined'` where an id may be missing.
- Returning a value: caller passes `goBackPath: RouteValues`; sheet calls `router.dismissTo({ params: returnParams, pathname: goBackPath })`; caller reads it then clears with `router.setParams({ x: undefined })`.
- **Never string-literal paths** — always `ROUTES`.

## 4. Which router verb

| Verb | Use for |
|---|---|
| `router.navigate` | default: open a screen or sheet |
| `<Link href={ROUTES...} asChild>` | static pressable cards/rows |
| `router.back()` | close a sheet/form after save |
| `useAppNavigation().goBack()` (`@/hooks/navigation.hooks`) | back buttons (falls back to HOME when nothing to go back to) |
| `router.dismissTo(...)` | return to a known screen / return params |
| `router.replace` | swap current screen (sheet → chat room, verify-code → new-password) |
| `router.dismissAll()` then `replace` | after destructive/terminal actions (block user, session created) |
| `router.push` | rare: stacking a sheet over a sheet |

`useDisableBack()` blocks Android hardware back. `useResetStoreOnUnmount(reset)` (`@/utils/navigation.utils`) resets a flow store when its screen unmounts.

## 5. Screen anatomy

- Thin: `<ScreenLayout>` + one list/scroll component. List screens put the header inside `List` (`ListHeaderComponent` / `ListStickyComponent`) with `contentContainerStyle={{ paddingBottom: bottom }}`.
- Scroll variant:
  ```tsx
  <ScreenLayout>
    <ScrollView bounces={false}>
      <SettingsHeader />  {/* memo'd wrapper around HeaderOutlined titleKey hasTopSafeArea hasHorizontalPadding */}
      <Wrapper fill className="z-50 gap-5 rounded-t-xl bg-background pt-6" style={{ paddingBottom: bottom }}>
        ...sections
      </Wrapper>
    </ScrollView>
  </ScreenLayout>
  ```
- Data screens: typed params → main query → `if (isLoading) return <Loading />;` → `if (!data) return <Redirect href={ROUTES.NOT_FOUND.INDEX} />;` → sections. Footer as a sibling after the ScrollView.
- Safe areas only via `useSafeArea()`.

## 6. Multi-step flows (create-session, on-boarding, register)

- One `step-N.ts` route per step; header + footer live in the flow `_layout.tsx` around a bare `<Stack screenOptions={{ animation: 'ios_from_right', headerShown: false }} />`.
- Active step derived from the pathname (`useGetCreateSessionStep()` pattern: parse trailing `-N`).
- Flow data in a feature Zustand store, reset by step 1 (or `useResetStoreOnUnmount`). Each step publishes validity to the store; the footer button decides the next route from the active step and submits at the end (`dismissAll()` + `replace(final step)`).
- Per-route-param shared state across sub-routes: wrap the nested Stack in a feature provider (chat-room pattern).

## 7. Deep links & push

- Scheme `ludora`, universal links `ludora.fr` (`/session`, `/profil`) — deep links rely on file paths matching; no `+native-intent`. Share URLs: `` `https://www.ludora.fr${ROUTES.SESSION.INDEX_UID(uid)}` ``.
- Push taps: `PushNotificationsInitializer` → `resolveNotificationRoute(actionUrl)` (`@/utils/push-notification-navigation.utils`) → `router.navigate`. Backend sends Expo Router paths — a new notification target must match an existing route file.

## 8. Providers & initializers

- `MainProvider` order: GestureHandlerRootView > PostHog > SafeArea > Tolgee > Query > Keyboard > (DevTools) > Icon > Toast. Put a new global provider at the depth its dependencies require. Scoped providers (e.g. Stripe) wrap only their subtree.
- Initializer = component returning `null` around a side-effect hook: `src/initializers/<name>.initializer.tsx`, default export `<Name>Initializer`.
  - global → `main.initializer.tsx`
  - needs auth → both `(root)` layouts
  - tab-scoped → `(tabs)/_layout.tsx`
  - feature-scoped → `features/<f>/components/<f>-initializers/`

## Known broken entries — don't copy

`ROUTES.CREATE_SESSION.STEP_3_PAYMENT`, `CREATE_SESSION_CREATED`, `CHAT_ROOM.MESSAGE_ACTIONS` have no route file; `SESSION.JOINED_UID` lacks a leading slash; `STEP_5` includes `/(root)`; `on-boarding/step-4` is orphaned; `providers/safe-area.provider.tsx` is dead code; `hooks/navigation.hook.ts` is the old duplicate.
