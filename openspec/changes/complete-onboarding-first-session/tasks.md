## 1. Backend: compatible players (ludora-back, SCRUM-692)

- [x] 1.1 Branch `feat/SCRUM-692` off `feat/SCRUM-696` (PR #222 not merged into `dev` yet: the PR is stacked on it) and verify `pnpm check` passes before any change
- [x] 1.2 Add `CompatibleUserFilterDto`: `sport`, `level`, `gameMode?`, `startDate`, `fieldUid`, `sessionUid?`, `limit`, `cursor`. Add the response DTO: `uid`, `firstname`, `lastname`, `imageUrl`, `level`, `distance`. Verify with the DTO validation tests
- [x] 1.3 Implement `UserLookupService.findCompatible`, one SQL query covering the rules of `specs/compatible-players`:
  - level within one;
  - formats;
  - day and period in Paris time;
  - play area contains the field;
  - exclusions;
  - ordering and pagination.
  Verify with service tests for each rule, including "no coordinates in the result"
- [x] 1.4 Expose `GET /users/compatible-list/collection` (protected, Swagger, mapper). Verify with the controller test and `pnpm swagger:generate` listing the route in `swagger-public.json`

## 2. Backend: recommended sessions (ludora-back)

- [x] 2.1 In `findRecommended`, accept a one-level gap (or `ANY`). Verify with tests: one level apart is accepted, two levels apart is rejected
- [x] 2.2 Use the play area (center, radius) first and fall back on the GPS position with 30 km. Verify with tests: field outside the radius but near the GPS is excluded; no play area means GPS is used
- [x] 2.3 Run `pnpm check`, `pnpm test` and `pnpm build`, and verify all pass

## 3. Mobile: setup

- [x] 3.1 Regenerate the client from the local backend swagger (`SWAGGER_FILE=… bun generate:api`). Verify that `usersFindCompatible…`, `useSessionsGetMyStats`, `useSportPreferencesFindMySportPreferences` and `useHourPreferencesFindMyHourPreferences` exist
- [x] 3.2 Add the `test` script (`bun test src`). Verify with a trivial passing run
- [x] 3.3 Move `useCreateSession` to `src/queries/create-session.query.ts`, also invalidating `my-stats`, and update the create-session imports. Verify with `bun ts:check`

## 4. Mobile: prepared session

- [x] 4.1 Add `ON_BOARDING_SESSION_DURATIONS`, `ON_BOARDING_SESSION_DEFAULT_GAME_MODES` and the moment start times to `on-boarding-sessions/constants`
- [x] 4.2 Write `prepared-session.utils.ts`:
  - sport with the highest level;
  - defaults;
  - first slot at least 48 h away, preferring the weekend within 7 days;
  - next Saturday without availabilities;
  - start and end dates.
  Verify with `prepared-session.utils.test.ts` covering every scenario of the "Prepared session values" requirement
- [x] 4.3 Add the `on-boarding-sessions` store (`preparedSession`, `publishedSessionUid`, `invitedUserUids`, `reset`) and register it in `reset-caches.utils.ts`
- [ ] 4.4 Write `usePreparedSession`: preferences queries → util → `list-verified` (`type: PUBLIC`, sport, `limit: 1`, no position) → store. Verify on the simulator that a profile with a play area gets the nearest public field

## 5. Mobile: routing and screens

- [ ] 5.1 Submit button: route home when no sport was chosen. Verify on the simulator with the sport step skipped
- [ ] 5.2 "Ton profil est prêt": next screen and texts per case (no place, suggestions, no match). Verify the 3 cases on the simulator
- [x] 5.3 Add the `prepared`, `invite` and `place` routes: `ROUTES.ON_BOARDING`, `RootStackParamList`, and the `place` sheet in both `(root)` layouts. Verify with `bun ts:check`
- [ ] 5.4 "Sessions pour toi" footer: "Créer ma propre session" (outlined) opens the prepared session; "Aller à l'accueil" goes home. Verify on the simulator
- [ ] 5.5 C2 "Ta première session est prête":
  - `HeaderMascot`;
  - session card, with "Modifier" opening "Choisir un terrain" until SCRUM-693;
  - the missing availabilities mention;
  - the field row, or "Choisir où jouer" (M1);
  - "Publier la session" (red, publishes then opens the invitations), or "Choisir où jouer" (beige, opens "Choisir un terrain") without a field;
  - compatible players hint above the card (avatars, count, day and moment);
  - "Aller à l'accueil" link with the "Quitter sans publier ?" confirmation (shared `DialogChoice`).
  Verify against the mockup on iOS and Android
- [ ] 5.6 Split `useOnBoardingPlayAreaLocation` with an `onLocated` callback, keeping step 2 unchanged. Verify step 2 "Autour de moi" still works
- [x] 5.7 Shared components in `src/components/ui`: `FieldSlotsCard` (+ skeleton), `TimeSlotChips`, `DurationPicker`, `PlaceSearchBar`, and the tested start times of the session's day (`getSessionDayStartTimes`). Verify with `bun ts:check` and `bun test`
- [ ] 5.7b "Choisir un terrain" screen (M2 to M7):
  - field list with count;
  - search bar, "Autour de moi", denied banner with "Ouvrir les Réglages";
  - no "Aller à l'accueil": the back button leaves the screen.
  Then "Combien de temps ?" form sheet: "Valider" sets the field and the slot on the prepared session. Remove the former place sheet. Verify each state on the simulator (no position, grant, deny, search, duration)
- [ ] 5.8 "Session publiée" screen (C4 / C5), after publishing:
  - no back button nor back gesture, "Ta session est en ligne. Invite des joueurs.";
  - link card with "Copier", then the compatible players list with the toggle;
  - footer "Inviter (n)" / "Terminer";
  - skeleton and `ErrorResult` states.
  Verify a finish with and without invitations
- [ ] 5.9 Home reminder card from `my-stats`: "Rejoindre une session" and "Créer une session" (prepared session, or create-session flow without a sport). Verify it disappears after a join or a publish

## 6. Mobile: analytics, translations, checks

- [ ] 6.1 Add the analytics events:
  - prepared session viewed;
  - not published;
  - published / publish failed (invited count);
  - link copied;
  - field chosen;
  - reminder card join / create.
  Verify they fire in the dev logs
- [x] 6.2 Create the Tolgee keys (FR and EN) through the MCP, then run `bun generate:translations:local`. Verify no raw key shows on any new screen
- [x] 6.3 Run `bun lint:fix && bun ts:check && bun test`, and verify all pass
- [ ] 6.4 Walk the full flow on iOS and Android for the 5 routing cases of the spec, and note any platform difference in the PR
