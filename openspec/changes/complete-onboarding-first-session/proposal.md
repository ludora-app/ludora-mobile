## Why

Jira: SCRUM-700, SCRUM-691, SCRUM-692.

New players finish the on-boarding without joining or creating a session: creating one feels like a commitment. The decisions document (`DECISIONS-onboarding.md`, D5 to D10) turns the on-boarding answers into a low-commitment first action: join a matching session first, otherwise publish a session Ludora prepared. Today the flow stops at "Ton profil est prêt": with no match it sends the player home, skipped steps are not handled, and the prepared session does not exist.

## What Changes

- **Routing after the on-boarding**: only the sport is required. Sport skipped → home with a reminder card. Place skipped → the suggestions are skipped and the prepared session asks for the place. Availabilities skipped → the prepared session falls on the next weekend.
- **"Sessions pour toi"**: footer with "Créer ma propre session" (to the prepared session, no longer to the create-session flow) and "Aller à l'accueil".
- **Prepared first session** (C2): sport, level, format, date, time and field computed from the on-boarding answers (rules D7), shown before publishing, with a compatible players hint, "Publier la session" and "Aller à l'accueil" (confirmed by "Quitter sans publier ?", back home, nothing saved: no drafts).
- **Missing place** (M1 to M8): on the prepared session, "Choisir où jouer" opens "Choisir un terrain", the list of the public fields with their start times. A search bar with "Autour de moi" (the location permission is asked only then) sorts them by distance, without saving a play area. A start time opens "Combien de temps ?", and the chosen field and slot go back to the prepared session. The field card, the start times and the duration picker are new shared components, reused later by the create-match redesign.
- **Session published, invite partners** (C4 / C5): once published, compatible players to invite and invite by link, then "Inviter (n)" or "Terminer". Without compatible players the link is the way to invite.
- **Home reminder card** (M6): "Crée ou rejoins ta première session", shown until the player has joined or created a session.
- **Backend (ludora-back)**:
  - new route listing the players compatible with a session that does not exist yet (SCRUM-692);
  - recommended sessions accept a one-level gap and use the play area (center and radius) instead of the GPS position with a fixed 30 km.

## Capabilities

### New Capabilities
- `onboarding-first-session`: what happens after the last on-boarding step: routing by answered steps, session suggestions, the prepared first session, the missing place flow, invitations, publishing, and the home reminder card.
- `session-recommendations`: which sessions are recommended to a player after the on-boarding (sport, level gap, availabilities, play area).
- `compatible-players`: which players are proposed for an invitation to a session before or after it is published.

### Modified Capabilities
<!-- None: openspec/specs/ is empty, this change writes the first requirements of these areas. -->

## Impact

- **Mobile**:
  - `src/features/on-boarding/` (sessions screens, store, new utils);
  - `src/features/home/` (reminder card);
  - new on-boarding routes and form sheet (both `(root)` layouts);
  - Tolgee keys `on-boarding.sessions.*`;
  - analytics events.
- **Backend (ludora-back)**:
  - `GET /users/compatible-list/collection` (new);
  - `GET /sessions/recommended-list/collection` (matching rules).
  - Mobile regenerates the Orval client from the local swagger until the backend is deployed.
- **ADRs**: applies 0002 (generated client), 0005 (place search), 0007 (play area as coordinates only).
- **Out of scope**: the "Modifier la session" page (SCRUM-693), drafts, the session detail page, field size and session conflict detection (no data in the backend yet).
