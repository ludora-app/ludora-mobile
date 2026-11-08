## Context

See proposal.md for the motivation and the specs for the required behaviour. Current state:

- The on-boarding (`src/features/on-boarding/`) has two parts:
  - `on-boarding-profile`: the 3 steps, with the `useOnBoardingStore` store;
  - `on-boarding-sessions`: "Ton profil est prêt", "Sessions pour toi", "Tu es inscrit !".
- At the last step, `on-boarding-footer-button-submit` saves:
  - the sport preferences;
  - the hour preferences;
  - the play area (`PUT /users/play-area`);
  - then the `COMPLETE` status.
- After the on-boarding, the answers live **in the backend**. The on-boarding store is only filled during the steps. The home reminder card can create a session days later, when the store is empty.
- Backend routes:
  - `GET /fields/list-public/collection` ignores location;
  - `GET /fields/list-verified/collection` (`type: PUBLIC`) ranks public fields by distance. Without a position from the app, it falls back on the play area (center, radius as max distance);
  - `GET /sessions/my-stats` returns `organizedCount` and `participatedCount`;
  - `findRecommended` keeps the exact level and uses the GPS position sent by the app with a fixed 30 km.
- The mobile repo has no test runner.

ADRs that apply:

- [0002](../../../docs/adr/0002-backend-through-the-generated-client.md): backend calls through the generated client;
- [0005](../../../docs/adr/0005-place-search-ign-first-google-fallback.md): place search;
- [0007](../../../docs/adr/0007-play-area-as-coordinates-only.md): only coordinates and radius are sent for the play area.

## Goals / Non-Goals

**Goals:**
- One flow from the last on-boarding step to a joined or published session, whatever steps were skipped.
- The prepared session can be rebuilt at any time from the backend data (after the on-boarding, or from the home card).

**Non-Goals:**
- The "Modifier la session" page (SCRUM-693). Until then, "Modifier" on the card opens "Choisir un terrain" (field, start time and duration of the same day). The store keeps the prepared session in a shape the edit page can update later.
- Field size per format and conflict detection: the backend has no field size data and does not expose sessions per field and slot. The nearest public field hosting the sport is used as is.
- Drafts.

## Decisions

### 1. The prepared session is computed in the app, from the backend data

- A pure util `on-boarding-sessions/utils/prepared-session.utils.ts` returns sport, level, format, start and end dates and the availability fallback flag. It takes:
  - the sport preferences (`GET /sport-preferences/me`);
  - the hour preferences (`GET /hour-preferences/me`);
  - `now`.
- A hook `usePreparedSession` reads those queries, calls the util, then looks up the field. It stores the result in a new `on-boarding-sessions` store (`preparedSession`, `publishedSessionUid`, `invitedUserUids`).
- The store is reset when the flow is left, and registered in `reset-caches.utils.ts`. The edit page (SCRUM-693) will update `preparedSession`.
- *Alternative*: a backend route that returns a prepared session. It is more central, but it adds a route for rules that only this screen uses and that are still being tuned (durations, weekend preference). It can move to the backend later without changing the spec.
- *Alternative*: compute from `useOnBoardingStore`. It is empty when the flow starts from the home card.

### 2. Field lookup through `list-verified`, without sending the position

- The hook calls `GET /fields/list-verified/collection` with:
  - `type: PUBLIC`;
  - `sports: [sport]`;
  - `limit: 1`;
  - **no `userLat`/`userLon`**.
- The backend then searches around the play area, within its radius, nearest first (a public field's score is only its distance).
- No play area, or no result: the field is `null`, which is the "Choisir où jouer" state.
- *Alternative*: `list-public` has no location at all.

### 3. Durations and default formats are constants

- `ON_BOARDING_SESSION_DURATIONS` (minutes per sport and format):
  - 90 by default;
  - 120 for football 11 vs 11.
- `ON_BOARDING_SESSION_DEFAULT_GAME_MODES`:
  - football 5 vs 5;
  - basketball 5 vs 5;
  - padel 2 vs 2;
  - tennis 1 vs 1.
- Both live in `on-boarding-sessions/constants`. The values can change without touching the spec.

### 4. Utils tested with `bun test`

- Bun's built-in runner resolves the `tsconfig` paths. Only the `@types/bun` dev dependency is added, so that `tsc` knows `bun:test`. The test files reference it with `/// <reference types="bun" />`, because `expo/tsconfig.base` limits the global types.
- The tests live next to the util (`prepared-session.utils.test.ts`) and run with a new `test` script (`bun test src`).
- Only pure utils are tested. Screens are checked on the simulator.
- *Alternative*: Jest with `jest-expo` brings a dependency and its configuration for a handful of pure functions.

### 5. Routes

New routes in `src/app/(root)/on-boarding/sessions/`, with `ROUTES.ON_BOARDING` entries:

- `prepared` → C2 / M1;
- `invite` → C3 / C4;
- `place` → M2 to M5, a form sheet declared in both `(root)` layouts.

"Ton profil est prêt" decides the next screen from the backend data:

- no play area (`useUserMe().playArea`) → prepared;
- recommended sessions → suggestions;
- otherwise → prepared.

The submit button routes to home when no sport was chosen.

### 6. "Choisir un terrain" is a screen built from shared components

- The mockup says the same card serves the create-match step 2. So the pieces go to `src/components/ui`:
  - `FieldSlotsCard`: photo or sport placeholder, "Terrain public" badge, name, address and distance, a slot for the start times, the meeting point note;
  - `TimeSlotChips`: a horizontal row of start times with the selected one highlighted;
  - `DurationPicker`: 1 h, 1 h 30, 2 h as quick choices with their end time, and a − / + stepper by 30 min (30 min to 6 h), mockup D; `useDurationLabel` formats a duration for the other screens;
  - `PlaceSearchBar`: the place search (`useSearchPlaces`, ADR 0005) with an "Autour de moi" button.
- The old `FieldCard` stays as is. The create-match screens move to the new card with their own redesign.
- `useOnBoardingPlayAreaLocation` takes an `onLocated(place)` callback and a `hasDeniedAlert` option. The step 2 keeps writing its store; the field list only keeps the position in local state.
- The position is **not** saved as play area: it only sorts `list-verified` (`userLat`, `userLon`, 30 km by default). Without a position, the backend falls back on the play area if there is one, otherwise it lists the fields without distance.
- A start time stores the pending field and time in the `on-boarding-sessions` store, then opens the duration form sheet (`/on-boarding/sessions/duration`, declared in the on-boarding stack so that `dismissTo` pops back to the prepared session instead of pushing a new one). "Valider" writes the field (`selectedField`) and the new dates into the prepared session, then `dismissTo` the prepared session. `useGetPreparedSession` returns `selectedField` before the field it looked up.

### 7. Publishing and invitations

- `useCreateSession` moves from `features/create-session/queries` to `src/queries` (two features use it). It also invalidates `GET /sessions/my-stats`.
- "Publier la session" on the prepared session calls `POST /sessions`, then pushes the invitation screen. The prepared screen stays mounted under it, so the store (published uid, invited players) survives; the invitation screen blocks going back.
- "Inviter (n)" calls `POST /session-invitations/:sessionUid` with the selected players; "Terminer" goes home.
- "Copier" copies `https://www.ludora.fr` + `ROUTES.SESSION.INDEX_UID(uid)` (`expo-clipboard`, as in "Tu es inscrit !").
- The compatible players come from `GET /users/compatible-list/collection`. Once the session is published, the call passes `sessionUid` so already invited players drop out.

### 8. Home reminder card from `my-stats`

- The card shows when `organizedCount + participatedCount === 0`. It is rendered at the top of the home list header.
- The join and create mutations invalidate `my-stats`, so the card disappears right after.
- "Rejoindre une session" opens "Sessions pour toi". "Créer une session" opens the prepared session, or the create-session flow when the player has no sport preference.

### 9. Backend (ludora-back)

**`GET /users/compatible-list/collection`** (SCRUM-692)

- In the users module: controller, filter DTO, response DTO, mapper.
- One raw SQL query in `UserLookupService` (PostGIS distance between the play area center and the field):
  - level gap of one;
  - formats;
  - day of week and period in Paris time, with the same helper as `findRecommended`;
  - play area contains the field;
  - exclusions;
  - ordering.
- Protected, Swagger documented, tested in `tests/users/`.

**`findRecommended`**

- The level condition becomes `ABS(s.level - preference) <= 1 OR s.level = ANY`.
- The distance uses the player's play area first: center, and radius as the max distance, via `UserLookupService.findPlayArea`. It falls back on the GPS position with 30 km.
- This is the reverse priority of `resolveSearchLocation`, on purpose: the recommendation follows the area the player declared, not where the phone is right now.

## Risks / Trade-offs

- [The nearest public field may not fit the format (an 11 vs 11 on a city stade), or may already host a session at that time] → "Modifier" lets the player pick another field (through "Choisir un terrain" until SCRUM-693 lands). Field size and conflicts need backend data, tracked in SCRUM-700 section 5.
- [The prepared session rules run in the app; a second client would duplicate them] → the util is pure and tested, and can move to a backend route without changing the spec.
- [The mobile client must be generated from the local backend swagger until the routes are deployed] → `SWAGGER_FILE=… bun generate:api` (ADR 0002). Deploy the backend before merging the mobile PR.
- [The mobile PR can be merged before the backend is deployed] → the backend PR goes first: the mobile PR depends on it and says so.

## Migration Plan

1. Merge and deploy the backend PR (no migration: compatible players read existing tables, recommendations change a query).
2. Merge the mobile PR, regenerating the client from the deployed swagger.
3. Rollback: revert the mobile PR. The previous app ignores the new route, and the recommendation change only widens the matches.

## Open Questions

- The exact durations per sport and format (constants, decision 3).
- Product thresholds still to validate: the level gap and the 14-day window. They are constants in the backend.
