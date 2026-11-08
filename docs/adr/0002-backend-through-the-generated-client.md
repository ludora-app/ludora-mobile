# 2. Reach the backend only through the client generated from its swagger

- **Status**: Accepted
- **Date**: 2025-12-13
- **Source**: existing code, transcribed in SCRUM-699

## Context

The mobile app talks to ludora-back (NestJS), which publishes an OpenAPI document. Hand-written
calls and hand-copied types drift from the backend as soon as a DTO changes, and the error only shows
at runtime.

## Decision

- `bun generate:api` downloads the backend's **public** swagger and generates TanStack Query hooks and
  DTO types with Orval into `src/api/generated/` (gitignored, never edited). The CI regenerates it
  the same way.
- Every backend call goes through a generated hook wrapped in a feature `*.query.ts` file, which adds
  invalidation (`useInvalidate*` in `onSuccess`) and error tracking.
- Server data lives in the TanStack Query cache only; Zustand holds client state (flows, UI), never a
  copy of server data.
- Calls to **third-party** APIs (IGN, Google Places) are hand-written with `ky` in `src/api/queries/`,
  since they have no swagger to generate from.

## Consequences

- A backend DTO change breaks `bun ts:check` instead of breaking at runtime.
- A mobile branch that depends on an unreleased backend route must generate from the local backend
  swagger (`SWAGGER_FILE=<path to ludora-back/swagger-public.json> bun generate:api`) until the route
  is deployed on dev.
- The generated folder is not in git: a fresh clone must run `bun generate:api` before `ts:check`.

## Alternatives considered

- **Hand-written `ky` calls with hand-written types**: no compile-time link with the backend.
