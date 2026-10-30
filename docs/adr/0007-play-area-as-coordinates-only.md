# 7. Send the play area as coordinates only, never the address

- **Status**: Accepted
- **Date**: 2026-10-30
- **Source**: SCRUM-696 (backend) and SCRUM-697 (mobile)

## Context

The play area (center + radius) is used to suggest sessions and fields near the user. The search can
return a full street address ("8 Impasse Destarac, Toulouse"). Storing it would keep where the user
lives, which the feature does not need (data minimization, GDPR).

## Decision

- The app sends `PUT /users/play-area` with `latitude`, `longitude` and `radiusKm` (5, 10, 20 or 30)
  only. The label picked in the search is shown during the on-boarding and never sent.
- The backend rounds the coordinates to 2 decimals (about 1 km) and fills the user's `city` from them
  with reverse geocoding.
- The play area is returned to its owner only (`GET /users`), never in another user's profile.

## Consequences

- No address of the user is stored, and the precise position is lost by design.
- `city`, which is public on the profile, now comes from the play area.
- Showing the play area again later needs a reverse geocoding or shows the city only.

## Alternatives considered

- **Store the full address (long and short label)**: more than the feature needs, and personal data
  to protect.
- **Store the exact coordinates**: same issue, with no gain at a radius of 5 km or more.
