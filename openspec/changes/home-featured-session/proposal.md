## Why

Jira: SCRUM-712 (follows SCRUM-700). Decisions A1 to A9 of `DECISIONS-accueil.md`.

Some players leave the on-boarding without joining or creating anything. Today the home screen offers "Créer un match", a reminder card (M6) and a list, without guiding them to a first action. Until they have joined or created a session, the home screen should put **one** session forward: the session that matches them, otherwise the session Ludora prepared for them. The list of all sessions stays underneath.

## What Changes

- **Home header** (A1, A5): yellow header "Salut {prénom} !" with a subtitle and the mascot, then a cream rounded edge, without the panel handle. On the first visit after the on-boarding, Ludo's bubble replaces the subtitle. The app remembers on the device that the first visit took place.
- **One featured card**, chosen by priority (A2):
  - **empty profile** (no sport): no featured session, "On fait quoi aujourd'hui ?" and "Créer un match" (A6);
  - **LA session** (A3): the best recommended session with its match reasons in green pills, "Rejoindre" (joins with an assigned team) and "Pas pour moi" (next suggestion, then the prepared session);
  - **prepared session** (A4): the session computed with the on-boarding rules (D7), with the compatible players hint, "Modifier" and "Publier ma session". Nothing is saved before publishing;
  - **next match** (A7): once a session is joined or published, the card of the next match, without buttons.
- **"Toutes les sessions" list** (A8): title, "Filtres" button, sport chips that filter the list. The search input, the place and radius pill and the week calendar are removed. Cards have no button; the whole card opens the session. "Pour toi" and "Tu es inscrit" badges. With no session around, an empty state offers "Élargir à 20 km".
- **BREAKING (spec)**: the home reminder card "Crée ou rejoins ta première session" (M6, `onboarding-first-session`) is removed: the featured card replaces it (A6).
- The prepared session rules (`prepared-session.utils.ts`) and the compatible players query move out of the on-boarding feature, shared by the on-boarding and the home screen.
- Backend pieces still missing (SCRUM-713) are computed in the app from real data: match reasons, "Pour toi" and "Tu es inscrit" badges, "Pas pour moi" kept for the app session.

## Capabilities

### New Capabilities
- `home`: what the home screen shows: header and Ludo's bubble, the featured card and its priority, "Pas pour moi", publishing the prepared session, the next match card, and the "Toutes les sessions" list with its filters and badges.

### Modified Capabilities
- `onboarding-first-session`: the "Home reminder card" requirement is removed, replaced by the home featured card.

## Impact

- **Mobile**:
  - `src/features/home/` (rewritten header, featured cards, list header, stores, queries, utils);
  - `src/utils/prepared-session.utils.ts` and `src/constants/prepared-session.constants.ts` (moved from the on-boarding feature);
  - `src/queries/get-compatible-players.query.ts` (moved, takes the published session uid as an argument);
  - `src/queries/join-session.query.ts` and `src/queries/create-session.query.ts` (wider invalidation);
  - `src/components/ui/session-card` (top badge slot);
  - Tolgee keys `home.*`; one Iconsax icon for the "Pour toi" star; analytics events.
- **Backend**: no new route needed. SCRUM-713 will add the ranking of recommendations, `isJoined` / `isRecommended` on the list and `matchReasons`; the app-side computations then go away without changing this spec.
- **OpenSpec**: the `complete-onboarding-first-session` change (SCRUM-700) was merged but never synced. Its specs are synced into `openspec/specs/` first, so that this change can remove the reminder card requirement from them.
- **ADRs**: applies 0001 (`@ludo/ui`), 0002 (generated client), 0003 (Tolgee).
- **Out of scope**: the bottom tab bar, the filters page and the session detail page (to be designed), actions after joining or publishing, the "Modifier la session" page (SCRUM-693), variants A, B and C.
