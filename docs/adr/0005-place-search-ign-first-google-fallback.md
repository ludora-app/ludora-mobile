# 5. Search places with IGN first, Google Places as a fallback

- **Status**: Accepted
- **Date**: 2026-10-29
- **Source**: SCRUM-697 (on-boarding step "Où joues-tu ?")

## Context

The user types a city, a district or an address to set their play area. Two services can answer:

- **IGN Géoplateforme** (`data.geopf.fr/geocodage/search`): free, no key, French addresses and
  municipalities, returns coordinates directly. Behind a WAF, it has intermittent timeouts and 504s.
- **Google Places API (New)**: reliable and worldwide, but paid per request, and its suggestions have
  no coordinates: a Place Details call is needed on select.

## Decision

- `useSearchPlaces` (`src/api/hooks/search-places.hook.ts`) calls **IGN first**, with a short timeout
  (4 s) and no retry.
- When IGN fails or times out (and the request was not cancelled), it calls **Google Places
  autocomplete** instead.
- Both answers are normalized to one `SearchPlace` type (`src/api/utils/search-places.utils.ts`).
  A Google suggestion has `location: null`; its coordinates are read with Place Details on select.
- The raw calls live in `src/api/queries/` (`geopf.query.ts`, `places.query.ts`); features use the hook.

## Consequences

- Most searches cost nothing; Google is only paid when IGN is down.
- Results can differ in shape and wording depending on which service answered.
- Outside France, IGN finds nothing and the user gets no fallback, since an empty answer is not a
  failure. This is acceptable while the app targets France.
- The Google key must allow the app's bundle identifiers.

## Alternatives considered

- **Google Places only**: paid for every keystroke batch, and an extra call for coordinates.
- **IGN only**: the search breaks whenever IGN is slow.
