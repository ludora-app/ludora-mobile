# Initializers and providers: what is mounted where

Real inventory of initializers and providers with their mount point, taken from the code.
Read it before adding a global provider or a side-effect component, to decide where it goes and what it may depend on.

## Mount hierarchy

```
src/app/_layout.tsx:98-107          RootLayout
  FontProvider                       providers/font-provider.tsx
    MainProvider                     providers/main.provider.tsx
      MainInitializer                initializers/main.initializer.tsx
      RootLayoutNav                  Stack + Stack.Protected guards
        (root)/_layout(.ios).tsx     AppLayout
          PushNotificationsInitializer
          OnBoardingInitializer
          AppLayoutNav               Stack
            (tabs)/_layout.tsx       <Tabs><GeolocalisationInitializer/> ...
            chat-room/[chatRoomId]/_layout.tsx   <ChatRoomProvider><Stack/>
              chat-room.screen.tsx   <ChatRoomInitializer/>
```

## MainProvider order (`src/providers/main.provider.tsx:17-32`)

Outermost to innermost:

1. `GestureHandlerRootView`
2. `PostHogProvider` (`./posthog.provider`)
3. `NativeSafeAreaProvider` (`react-native-safe-area-context`, `initialMetrics={initialWindowMetrics}`)
4. `TolgeeProvider` (`./tolgee-provider`)
5. `QueryProvider` (`./query.provider`)
6. `KeyboardProvider` (`react-native-keyboard-controller`)
7. `<DevToolsProvider />` rendered as a **sibling** of `IconProvider`, not a wrapper (self-closing, `:23`); it returns `null` unless `EXPO_PUBLIC_ENV === 'development'` or `__DEV__` (`providers/dev-tools.provider.tsx:15-17`) and uses `useRouter` to open `ROUTES.DEV_TOOLS.INDEX` / `STORYBOOK` (`:32,40`).
8. `IconProvider` (`./icon.provider`)
9. `ToastProvider` (`./toast.provider`) wrapping `{children}`

`FontProvider` sits outside `MainProvider` (`_layout.tsx:100`), so fonts load before anything else mounts. Anything that needs translations, queries or safe-area values must be placed at or below its depth: `TolgeeProvider` before `QueryProvider`, toasts innermost so every screen can call `useToast`.

Scoped provider: `providers/stripe.provider.tsx` wraps only the payment trigger (`features/create-session/formsheets/create-session-step-3-payment/create-session-step-3-payment-trigger.component.tsx:120-122`). It throws at import if the Stripe `merchantIdentifier` plugin config is missing (`stripe.provider.tsx:12-14`), which is why it is not global.

Feature provider: `ChatRoomProvider` (`@/features/chat-room/context/chat-room-store-context`) wraps the nested Stack in `src/app/(root)/chat-room/[chatRoomId]/_layout.tsx:5-11`, so `info/private` and `info/session` share the chat-room store.

Dead code: `providers/safe-area.provider.tsx` (`SafeAreaProvider`) has no importer (grep finds none); it duplicates `initializers/safe-area-insets/safe-area-insets.initializer.tsx`.

## Initializers

Convention: component returning `null` (or a thin switch) around a side-effect hook, `src/initializers/<name>.initializer.tsx`, default export `<Name>Initializer`.

| Initializer | File | Mounted in | What it does |
|---|---|---|---|
| `WebsocketInitializer` | `initializers/websocket.initializer.tsx` | `MainInitializer` (`main.initializer.tsx:9`) | `useWebsocketConnection()` |
| `SafeAreaInitializer` | `initializers/safe-area-insets/safe-area.initializer.tsx` | `MainInitializer` (`:10`) | renders `SafeAreaInsetsInitializer` only while the store has no insets (`!insets && ...`) |
| `SafeAreaInsetsInitializer` | `initializers/safe-area-insets/safe-area-insets.initializer.tsx` | `SafeAreaInitializer` | `Uniwind.updateInsets` + `useSafeAreaStore.setInsets` (this feeds `useSafeArea()`) |
| `PostHogIdentifierInitializer` | `initializers/poshog-identifier.initializer.tsx` (sic) | `MainInitializer` (`:11`) | `posthog.identify` on login, `posthog.reset()` on logout, via `useAuthStore` + `useUserMe` |
| `CheckAppVersionInitializer` | `initializers/check-app-version.initializer.tsx` | `MainInitializer` (`:12`) | on mount, `router.navigate({ params, pathname: ROUTES.APP_CHECK.INDEX })` for required/optional updates (`:42-45`, `:62-65`) |
| `PushNotificationsInitializer` | `initializers/push-notifications.initializer.tsx` | both `(root)` layouts (`_layout.tsx:225`, `_layout.ios.tsx:206`) | registers FCM token via `useRegisterDevice`; tap handler -> `resolveNotificationRoute` -> `router.navigate` (`:27-39`) |
| `OnBoardingInitializer` | `initializers/on-boarding/on-boarding-initializer.tsx` | both `(root)` layouts (`:226` / `:207`) | redirect to `/on-boarding/step-1` when status is `INCOMPLETE` |
| `OnBoardingStatusInitializer` | `initializers/on-boarding/on-boarding-status.initializer.tsx` | `OnBoardingInitializer` when status is unknown | syncs `userMe.onBoardingStatus` into the persisted store |
| `GeolocalisationInitializer` | `initializers/geolocalisation.initializer.tsx` | `(tabs)/_layout.tsx:12` | after an 800 ms timeout, `getCurrentLocation()` (`:18-23`) |
| `ChatRoomInitializer` | `features/chat-room/components/chat-room-initializers/chat-room-initializer.component.tsx` | `features/chat-room/screens/chat-room.screen.tsx:15` | groups `ChatRoomIdInitializer`, `ChatRoomInfoInitializer`, `ChatRoomMessagesReadFallbackInitializer` (`:9-11`) |

Placement rule that follows from the table:

- **Global, auth-agnostic** -> `MainInitializer`. Note it sits above `Stack.Protected`, so it runs before login too: `PostHogIdentifierInitializer` and `CheckAppVersionInitializer` therefore guard on auth themselves (`isAuthenticated` check at `poshog-identifier.initializer.tsx:15,23`). `useWebsocketConnection` also reads `useAuthStore` (`hooks/web-sockets/web-sockets.hook.ts:15`).
- **Needs an authenticated user** -> both `(root)/_layout.tsx` **and** `_layout.ios.tsx` (they must stay identical here: lines 225-226 vs 206-207).
- **Only meaningful on tabs** -> `(tabs)/_layout.tsx`, as a child of `<Tabs>` next to `TabSlot`.
- **Tied to one screen/route param** -> `features/<f>/components/<f>-initializers/` (chat-room is the only one today), rendered by the screen. They read route params with `useLocalSearchParams` and sync a feature store (`chat-room-id-initializer.component.tsx:9-31`).

## Initializer-shaped details worth knowing

- `OnBoardingInitializer` returns a `Redirect`, not `null`, so its render must stay a pure branch on store state (`on-boarding-initializer.tsx:20-28`); `OnBoardingRedirect` skips the redirect while the pathname contains `on-boarding` or `image-picker` (`:9-11`).
- Initializer files are not uniform: `main`, `websocket`, `push-notifications` use `<name>.initializer.tsx`; the on-boarding entry point is `on-boarding-initializer.tsx` (dash, no dot). Follow the dotted form for new files.
- `CheckAppVersionInitializer` mixes a typed navigate with `RootStackParamList[typeof ROUTES.APP_CHECK.INDEX]` (`:19,37-45`), a good template for an initializer that navigates with params.
- `PushNotificationsInitializer` casts the resolved route (`router.navigate(route as any)`, `:33`); a new notification target still has to match an existing route file.
- `hooks/navigation.hook.ts` (old duplicate) is still imported by `features/auth/forgot-password/reset-password/screens/reset-password.screen.tsx:9`, so it is not dead; new code uses `@/hooks/navigation.hooks`.
