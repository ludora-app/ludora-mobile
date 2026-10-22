# Multi-step flows (create-session, on-boarding)

How the two real flows are wired: layout, step detection, store sync and footer logic, with exact files.
Read it before adding a step to either flow or building a new flow with a shared header and footer.

## Shared skeleton

The flow `_layout.tsx` renders header, a bare `Stack`, then footer. Screens contain only their body.

```tsx
// src/app/(root)/create-session/_layout.tsx:12-20
export default function CreateSessionLayout() {
  return (
    <>
      <CreateSessionHeader />
      <CreateSessionLayoutNav />
      <CreateSessionFooter />
    </>
  );
}
```

`CreateSessionLayoutNav` is `<Stack screenOptions={{ animation: 'ios_from_right', headerShown: false }} />` (`:6-10`, no `Stack.Screen` children, steps are auto-discovered). On-boarding (`src/app/(root)/on-boarding/_layout.tsx:23-31`) has the same shape inside a `Box flex-1 bg-background`, but lists `step-1` and `step-2` explicitly (`:17-18`), sets a cream `contentStyle` (`COLORS.background`, `:13`) and uses `FooterWrapper` instead of `FormSheetFooter`.

Both flows are opened from `(root)/_layout*.tsx`: `create-session` with `slide_from_bottom` (`_layout.tsx:19-25`), on-boarding with no entry (push).

## Step detection from the pathname

Two identical hooks (copy-paste, one per feature):

- `src/features/create-session/hooks/create-session-step.hook.ts:4-16` (`useGetCreateSessionStep`)
- `src/features/on-boarding/hooks/on-boarding-steps.hook.ts:4-15` (`useGetOnBoardingStep`)

```ts
const lastSegment = pathname.split('/').pop()?.split('-').pop();
const parsedStep = Number(lastSegment) || 0;
const [fallbackStep, setFallbackStep] = useState(() => parsedStep || 1);
if (parsedStep && parsedStep !== fallbackStep) {
  setFallbackStep(parsedStep);
}
return { activeStep: parsedStep || fallbackStep };
```

The fallback keeps the last valid step during transitions where `usePathname()` briefly does not end in `-N`. Consequence: route files must be named `step-N` and nothing else may end in `-<number>`.

Header and footer are siblings of the `Stack`, so they stay mounted across steps and re-render on `activeStep` only.

## create-session

Files (all under `src/features/create-session/` unless noted):

| Concern | File |
|---|---|
| Layout | `src/app/(root)/create-session/_layout.tsx` |
| Step routes | `src/app/(root)/create-session/step-{1..5}.ts` -> `screens/create-session-step-N.screen.tsx` |
| Tab entry | `src/app/(root)/(tabs)/create-session.tsx` (same step-1 screen); the centre tab button calls `router.navigate(ROUTES.CREATE_SESSION.STEP_1)` (`src/components/ui/navigation/tab-bar/components/tab-bar-button/tab-bar-button.component.tsx:44`) |
| Header + stepper | `components/create-session-header/create-session-header.component.tsx`; its own older copy of the stepper (`create-session-header-progress-stepper.component.tsx`); new flows use `ProgressStepper` from `@ludo/ui` |
| Footer | `components/create-session-footer/create-session-footer.component.tsx` |
| Flow store | `store/create-session.store.ts` (`session`, `isStep3Valid`, `createdSessionUid`) |
| Layout store | `store/create-session-layout.store.ts` (`footerHeight`) |

Steps: 1 sport/level/mode, 2 field + slot, 3 title/description/teams, 4 recap, 5 created.

### Footer logic

`create-session-footer.component.tsx:11-14` derives which button to show from `activeStep`:

```tsx
const showNextStepButton = activeStep <= 3;
const showCreateSessionButton = activeStep === 4;
const showCreatedSessionButtons = activeStep === 5;
```

It also reports its height (`onLayout` -> `useCreateSessionLayoutStore.setFooterHeight`, `:19`) so keyboard toolbars can offset under the Stack.

- **Next** (`create-session-footer-button-next-step.component.tsx`): validity is computed in the button from the store, not published by the screen, for steps 1 and 2 (`isStep1Valid` `:25-28`, `isStep2Valid` `:30-36`); step 3 reads `isStep3Valid` from the store (`:38`). `handleSubmit` (`:53-123`) tracks an event and `router.navigate(ROUTES.CREATE_SESSION.STEP_{n+1})`.
- **Create** (step 4, `create-session-footer-button-create-session.component.tsx:48-70`): calls `createSession`, stores `setCreatedSessionUid`, then
  ```ts
  router.dismissAll();
  router.replace(ROUTES.CREATE_SESSION.STEP_5);
  ```
- **Created** (step 5, `create-session-footer-buttons-created-session.component.tsx`): invite (`router.navigate(ROUTES.INVITE_FRIENDS.INDEX_UID(createdSessionUid))`, `:18`), share, back via `router.back`.

### Store sync and reset

- Step 3 publishes validity: `useEffect(() => setIsStep3Valid(isValid), ...)` (`screens/create-session-step-3.screen.tsx:85-87`) and mirrors form values into the store (`:89-`).
- Store merge: `setSession` merges and strips `''`/`null`/`undefined`, `additionalData` merged separately (`store/create-session.store.ts:36-54`).
- Reset: step 1 resets both flow stores on unmount via `useResetStoreOnUnmount(reset)` (`screens/create-session-step-1.screen.tsx:48-53`, helper at `src/utils/navigation.utils.ts:7-20`). It only fires when step 1 unmounts, i.e. when the flow is torn down (inference: the Stack keeps earlier steps mounted).
- Sheet inside the flow: slot pick opens `ROUTES.CREATE_SESSION.STEP_2_DURATION_FORM_SHEET` (`/public-field-duration`, a root-level route, see `route-map.md`) with typed params (`...public-availabilities-list.component.tsx:104-115`). The sheet writes the store, sets `autoGoToNextStep: true` and calls `router.back()` (`formsheets/.../create-session-step-2-session-public-field-duration.formsheet.tsx:77-93`); the Next button's effect then auto-submits after `DELAY_TO_GO_TO_NEXT_STEP = 200` ms "to let the formsheet close" (`next-step.component.tsx:125-138`).

### Known broken here

`ROUTES.CREATE_SESSION.STEP_3_PAYMENT` is navigated at `next-step.component.tsx:73` when `fieldType === 'partner'` but has no route file; the payment UI lives in `formsheets/create-session-step-3-payment/` and is wrapped by `StripeProvider` locally (see `initializers-and-providers.md`). `STEP_5` is `'/(root)/create-session/step-5'` (`routes.constants.ts:33`).

## on-boarding

| Concern | File |
|---|---|
| Layout | `src/app/(root)/on-boarding/_layout.tsx` |
| Step routes | `on-boarding/step-{1,2}.ts` -> `features/on-boarding/screens/on-boarding-step-N.screen.tsx` |
| Sport sheet | `src/app/(root)/on-boarding-sport.ts` (root-level, `ROUTES.ON_BOARDING.SPORT_FORM_SHEET`, param `sport`) -> `features/on-boarding/formsheets/on-boarding-sport.formsheet.tsx` |
| Header | `features/on-boarding/components/on-boarding-header.component.tsx` (`hasGoBack = activeStep > 1`, `ProgressStepper` from `@ludo/ui` with `numberOfSteps={ON_BOARDING_STEPS_COUNT}`) |
| Steps count | `features/on-boarding/constants/on-boarding.constants.ts:4` (`ON_BOARDING_STEPS_COUNT = 2`) |
| Footer | `features/on-boarding/components/on-boarding-footer/on-boarding-footer.component.tsx` |
| Flow store | `features/on-boarding/stores/on-boarding.store.ts` (`sportPreferences`, `availabilities`, `clearAll`) |
| Status store | `src/stores/on-boarding-status.store.ts` (persisted in MMKV) |

Steps: 1 sports (one card per sport, level and game modes picked in the sheet), 2 availabilities (day x moment grid, week/weekend shortcuts, recap).

### Gate: how the user ends up here

`OnBoardingInitializer` (`src/initializers/on-boarding/on-boarding-initializer.tsx:17-30`), mounted in both `(root)` layouts, switches on `onBoardingStatus`:

- `'COMPLETE'` -> `null`.
- `'INCOMPLETE'` -> `OnBoardingRedirect`: `<Redirect href={ROUTES.ON_BOARDING.STEP_1} />` unless the pathname includes `on-boarding` (`:8-15`; this also matches `/on-boarding-sport`, so the sheet is not redirected).
- anything else (`null`) -> `OnBoardingStatusInitializer`, which copies `userMe.onBoardingStatus` into the persisted store (`on-boarding-status.initializer.tsx:13-17`).

### Footer logic

`on-boarding-footer.component.tsx:12-31`: `isFinalStep = activeStep === ON_BOARDING_STEPS_COUNT` (`:16`), then `<OnBoardingFooterButtonSubmit />` (plus a `footer_note` line) else `<OnBoardingFooterButtonNext />`.

- **Next** (`on-boarding-footer-button-next.component.tsx`): `router.navigate(ROUTES.ON_BOARDING.STEP_2)` (`:15`). Step 1 is skippable: title becomes `common.pass` and the variant `muted` while `sportPreferences` is empty (`:12`, `:20-21`).
- **Submit** (`on-boarding-footer-button-submit.component.tsx:28-56`): creates sport preferences if any, puts hour preferences if any (`usePutUserHoursPreferences` from `src/queries/put-user-hours-preferences.query.ts`, shared with settings, fed by `toHourPreferences(availabilities)`), `updateUserMe({ onBoardingStatus: 'COMPLETE' })`, tracks `ONBOARDING_COMPLETED` with `has_hour_preferences` / `has_sport_preferences`, then
  ```ts
  setOnBoardingStatus('COMPLETE');
  clearAll();
  router.replace(ROUTES.HOME.INDEX);
  ```
  Flipping the status store is what makes `OnBoardingInitializer` stop redirecting. Title is `common.finish`, or `common.pass` / `muted` while `availabilities` is empty (`:62-63`).

### Store sync

Step 1 cards open the sport sheet with typed params (`on-boarding-sports-card.component.tsx:38-41`). The sheet keeps a local draft (`level`, `gameModes`, `on-boarding-sport.formsheet.tsx:24-28`) and writes the store only on validate (`common.validate`, `upsertSportPreference` then `router.back()`, `:36-40`), or removes the sport (`:42-45`); swiping the sheet down discards the draft. Step 2 toggles groups of slots (cell, day, moment, shortcut) through `useOnBoardingAvailabilitiesToggle` (`hooks/on-boarding-availabilities-toggle.hook.ts`), which calls `setAvailabilities(group, isSelected)`. There is no per-step validity: the footer only reads store contents to pick its label. The flow store is cleared only on successful submit (`clearAll`), not on unmount.

## Register (auth)

`src/app/auth/register/_layout.tsx` is a bare Stack with `step-1` and `step-2` and no shared header/footer; each step screen owns its own UI. Use create-session or on-boarding as the model only when a shared footer is needed.
