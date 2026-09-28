---
name: ludora-feature
description: Entry point for ANY feature work in the Ludora mobile app (ludora-mobile) — new screen, new feature folder, extending an existing feature, fixing UI/logic bugs, refactors. Defines the src/ architecture (features/, components/, queries/, stores/, hooks/, initializers/), where each kind of file goes, the step-by-step workflow and the done checklist, and tells which specialised skills to load (ludora-code-style, ludora-ui, ludora-data, ludora-navigation).
---

# Ludora feature workflow

## Always load alongside

- **ludora-code-style**: always, before writing any code.
- **ludora-ui**: components, lists, sheets, styling, translations.
- **ludora-data**: queries, mutations, stores, forms, analytics.
- **ludora-navigation**: routes, layouts, params, flows, initializers.

These project skills override generic ones (`react-native-best-practices`, any generic Zustand/React guide) when they disagree.

## 1. Architecture

```
src/
  app/            Expo Router — thin re-export route files + layouts only (no logic)
  features/<f>/   everything feature-specific (kebab-case feature name)
  components/
    ludo-ui/      @ludo/ui  — app design-system primitives (wraps chill-ui)
    chill-ui-library/  @chillui/ui — underlying UI lib (don't modify for features)
    ui/           shared composed components (SessionCard, EmptyResult, HeaderOutlined, FormSheet*…)
  queries/        query wrappers shared by ≥2 features
  stores/         global Zustand stores (auth, websocket, safe-area, geoloc, on-boarding-status)
  hooks/          cross-feature hooks (analytics, safe-area, navigation, auth-helpers, web-sockets/)
  initializers/   render-null side-effect components (main.initializer + scoped ones)
  providers/      global providers composed in main.provider.tsx
  services/       non-React singletons (websocket, push, posthog)
  constants/  types/  utils/  lib/ (dayjs)
  api/            ky instance, Orval mutator, generated client (gitignored)
```

Feature folder (create only what's needed):
```
features/<f>/
  screens/      <f>-<name>.screen.tsx
  formsheets/   <f>-<name>.formsheet.tsx
  components/   <f>-<part>/<f>-<part>.component.tsx (+ -skeleton, -item, -header-sticky…)
  queries/      <verb>-<thing>.query.ts
  stores/       <f>-<name>.store.ts
  schemas/      <form>.schema.ts
  hooks/        <name>.hook.ts
  context/      <name>.context.ts(x)
  types/        <f>.types.ts   (incl. route-param aliases)
  constants/    <f>.constants.ts
  utils/        <name>.utils.ts
```

**Placement rule:** code starts in the feature. Move it to `src/components/ui`, `src/queries`, `src/hooks` or `src/stores` only when a second feature needs it — move, don't duplicate. Features import each other's files by direct path (`@/features/profil/queries/...`); no barrels.

## 2. Workflow

1. **Explore first.** Read the closest existing feature with the same shape (list → `players`/`settings-favorites`; form sheet → `profil` formsheets; multi-step → `create-session`; detail screen → `session`). Check `src/components/ui` and `src/queries` for something reusable. Check the date of the reference files; the newest pattern wins.
2. **Data:** find the generated hook (`src/api/generated/api/<tag>/`), write or reuse the `*.query.ts` wrapper with invalidation (ludora-data).
3. **State:** add a feature store only if state is shared between components or steps; otherwise use local `useState`.
4. **UI:** a thin screen, plus components that own their data. Add skeleton and empty state. Wrap translations in `t()`. (ludora-ui)
5. **Route:** add the re-export file, options in **both** `(root)` layouts if it's a sheet or modal, a `ROUTES` entry, and a `RootStackParamList` entry. (ludora-navigation)
6. **Analytics:** add `ANALYTICS_EVENTS` entries for user actions (success and failed).
7. **Verify:** `bun lint:fix && bun ts:check`.

## 3. Done checklist

- [ ] `bun lint:fix` and `bun ts:check` pass (same as the pre-commit hook).
- [ ] No hard-coded user-facing strings. New Tolgee keys are listed for the user with suggested FR/EN text.
- [ ] New icons were generated with `bun generate:icons`, not inlined.
- [ ] New route: re-export file, both layouts, `ROUTES`, `RootStackParamList`.
- [ ] New store: has `reset()` and is registered in `src/utils/reset-caches.utils.ts`.
- [ ] Mutations invalidate everything they affect. Call sites track success and failure.
- [ ] Loading, empty and not-found states are handled.
- [ ] Nothing from the "don't copy" lists (ludora-code-style §8, ludora-navigation end).
- [ ] If the change can't be tested in the simulator from here, say so. Don't claim it works.

## 4. When the user asks for something that conflicts

If a request would break these conventions (for example a hand-written fetch, a new enum, logic in a route file), follow the convention and mention it briefly. If the user insists, do what they ask.
