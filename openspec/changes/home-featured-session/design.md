## Context

See proposal.md for the motivation and `specs/home/spec.md` for the required behaviour. Sources: SCRUM-712,
`DECISIONS-accueil.md` (A1 to A9) and the mockups R1 to R11 (`LudoraAccueil`, variant R).

Current state:

- `src/features/home/` renders one `List` over the orange background image:
  - a transparent header of fixed height (`HeaderScreen`, outlined title, "Créer un match" or the next match card);
  - a sticky search input with the filters button, the M6 reminder card and a week carousel;
  - `SessionCard` items.
- The on-boarding (SCRUM-700) already holds:
  - the prepared session rules (`on-boarding-sessions/utils/prepared-session.utils.ts`, tested with `bun test`);
  - the compatible players query;
  - the prepared session screen, where the field and the slot can be changed and the session published.
- The backend already exposes everything a first version needs:
  - `GET /sessions/recommended-list/collection` (sorted by date for now);
  - `POST /session-players/join` (team optional);
  - `GET /users/compatible-list/collection`, `GET /sessions/my-stats`, `GET /sessions/my-list/collection`
    (all ownerships when `ownership` is omitted), `GET /sessions/{uid}` (`isJoined` per team);
  - `GET /sessions/list/collection` (`sports`, `maxDistance` in km);
  - `GET /sport-preferences/my-list`, `GET /hour-preferences/my-list`, `POST /sessions`.
- Missing until SCRUM-713: ranking of the recommendations, `isJoined` / `isRecommended` on the list, `matchReasons`,
  and "Pas pour moi" remembered by the engine.

ADRs that apply:

- [0001](../../../docs/adr/0001-ui-on-ludo-ui-over-chill-ui.md): the screens are built with `@ludo/ui`, Uniwind tokens and the shared components; the mockup is a reference, not code;
- [0002](../../../docs/adr/0002-backend-through-the-generated-client.md): every backend call goes through the generated Orval hooks, wrapped in `*.query.ts`; nothing is added to `src/api/generated`;
- [0003](../../../docs/adr/0003-translations-in-tolgee.md): every new text is a Tolgee key (`home.*`), created in FR and EN.

No ADR is superseded and no new ADR is needed: the change applies these records and adds no library, service or
data rule.

## Goals / Non-Goals

**Goals:**
- One featured card chosen by a pure, explicit priority, and the list underneath, matching R1 to R11.
- No new backend route: everything is computed from real data, so that SCRUM-713 only removes app-side code.
- The prepared session rules live once, shared by the on-boarding and the home screen.

**Non-Goals:**
- The bottom tab bar (unchanged), the filters page and the session detail page (existing screens), the actions
  after joining or publishing, the "Modifier la session" page (SCRUM-693), variants A, B and C.
- Changing the on-boarding screens.

## Decisions

### 1. The featured card is a pure function of the home data

- A util `getHomeFeaturedState` returns one of `loading`, `next-match`, `empty-profile`, `idle`, `match`,
  `prepared` from booleans and lists: next match, sport preferences, first session pending (`my-stats`),
  suggestions left. It is tested with `bun test`.
- A `useGetHomeFeatured` hook gathers the queries and calls it. The header and its card read the hook; each card
  component owns its own mutation.
- `prepared` carries a reason: `passed` (every suggestion was passed), `none-around` (no session within 10 km),
  `no-match`. It drives the subtitle and the bubble.
- *Alternative*: nested conditions in the header component. Harder to test, and the priority is the core of A2.

### 2. Match reasons computed in the app, in a tested util

- `getMatchReasons({ availabilities, session, sportPreferences })` returns the level, slot and distance reasons:
  - level: the session's level equals the player's level for that sport, or is 0 (all levels);
  - slot: the session starts in an availability (recurrent day of week, or one-time date) of the same moment
    (morning before 12:00, afternoon before 17:00, evening after, as the on-boarding hint);
  - distance: `userDistance` (km), rounded to one decimal.
- `TODO(SCRUM-713)` marks it: once `matchReasons` exists on `recommended-list`, only the hook changes.

### 3. "Pas pour moi" in a memory store, at most 3 suggestions

- `useHomeFeaturedStore` (not persisted): `dismissedSessionUids`, `dismissSession`, `reset`, registered in
  `reset-caches.utils.ts`. Kept until the app is closed (ticket, section 8).
- The suggestions are the first page of `recommended-list` without the dismissed ones, capped at
  `HOME_MAX_SUGGESTIONS = 3`. The prototype shows two; the cap answers open question 1 provisionally and is a
  constant.

### 4. First visit remembered in a persisted store

- `useHomeWelcomeStore` (zustand `persist` on MMKV, key `HOME_WELCOME_STORAGE`): `hasSeenBubble`.
- The header reads it **once** at mount (`useState(() => …getState())`) so the bubble stays during this visit, and
  sets it in an effect once the bubble is actually shown. Logout clears MMKV and resets the store.
- Players who finished the on-boarding before this release see the bubble once too: accepted.

### 5. Prepared session shared, recomputed on each opening

- Move `prepared-session.utils.ts` (+ test) to `src/utils/` and the constants it uses to
  `src/constants/prepared-session.constants.ts`; the on-boarding imports them from there.
- Move `get-compatible-players.query.ts` to `src/queries/`; it takes `sessionUid` as an argument instead of reading
  the on-boarding store (the on-boarding passes its published uid).
- `useGetHomePreparedSession` (home feature): preference queries → `getPreparedSession` with `now` fixed at mount →
  nearest public field (`list-verified`, `type: PUBLIC`, `limit: 1`, no position, as the on-boarding). No store:
  nothing is kept between two openings (no draft, D7).
- "Publier ma session" calls `useCreateSession` with the values and the field. "Modifier", and "Choisir où jouer"
  without a field, open `ROUTES.ON_BOARDING.SESSIONS_PREPARED`: that screen recomputes the same values, lets the
  player change the field and slot and publish, until SCRUM-693.
- *Alternative*: reuse `useGetPreparedSession` from the on-boarding. It writes the on-boarding store, which the
  prepared screen resets on unmount: sharing it would couple both screens.

### 6. Next match from `my-list`, both ownerships

- `useGetMyUpcomingSessions`: `GET /sessions/my-list/collection` with `scope: UPCOMING`, ascending start date, no
  `ownership`, first page of 20. Its first item is the next match; all its uids feed the "Tu es inscrit" badge
  (ticket, section 8: cross with `my-list`).
- Organised when `creatorUid` is the user's uid. For a joined session, the team comes from `GET /sessions/{uid}`
  (`isJoined` on each team); until it loads, the card shows the organiser line.
- Join and create invalidate `my-list`, `my-stats`, the list and the recommendations, so the header switches to the
  next match card by itself.

### 7. Header and list layout

- The screen drops the background image: cream background, the yellow header (`bg-tertiary`, safe area) is the
  list's `ListHeaderComponent`, measured by the list (no fixed height). It ends with the cream rounded edge and the
  list header ("Toutes les sessions", "Filtres", sport chips), not sticky.
- A tall yellow block above the header hides the cream background on iOS overscroll.
- Items are wrapped in a padded row component; `getFixedItemSize` adds the badge height for the badged cards.
- `SessionCard` gets an optional `topContent` slot for the badge (shared component, additive).
- The filters button keeps the existing filters page (`FiltersHeader` logic: `ROUTES.FILTERS.FILTER` and the
  `selectedFilters` return param), without the search input.

### 8. List filters

- The home filters store keeps the filters page values, plus `sports` from the chips and `maxDistance`
  (`HOME_SESSIONS_DEFAULT_DISTANCE_KM = 10`, `HOME_SESSIONS_WIDE_DISTANCE_KM = 20`). The date carousel is gone:
  `startDate` is now unless the filters page sets a date.
- "No session around" uses a separate `limit: 1` count on the list route, with the default distance and without
  sport, so that a sport chip never changes the header.
- The "Pour toi" badge crosses the list with the recommended uids (ticket, section 8), never on an empty profile
  (the recommendations are not fetched without a sport).

## Risks / Trade-offs

- [`recommended-list` is sorted by date, so "LA session" is the nearest in time, not the best match] → same contract
  once SCRUM-713 ranks it; nothing changes in the app.
- [The badges only cover the first 20 upcoming sessions of the player and the first 20 recommendations] → enough
  for a player who is starting; SCRUM-713 puts `isJoined` / `isRecommended` on the list.
- [The prepared session and the "Modifier" screen compute the values separately] → both use the same util and the
  same field lookup on the same day; the values match.
- [`complete-onboarding-first-session` is synced but not archived] → its specs were synced into `openspec/specs/`
  by this change, so that the reminder card requirement could be removed. **When it is archived, its specs must not
  be synced again** (the reminder card would come back): archive it without syncing.
- [No device available in the CI] → lint, ts:check and `bun test` only; the screens must be checked on iOS and
  Android against R1 to R11.

## Migration Plan

1. Merge the mobile PR; no backend deployment is needed.
2. Rollback: revert the PR. The persisted `HOME_WELCOME_STORAGE` key is then ignored.

## Open Questions

- Open questions 1 to 8 of the ticket stay open; this change takes provisional answers where it must:
  - 1: 3 suggestions, passed sessions forgotten when the app closes;
  - 2: the bubble shows on the first visit only;
  - 3: direct join with an assigned team;
  - 7: a player with a sport but no place gets the prepared session card with "Choisir où jouer".
