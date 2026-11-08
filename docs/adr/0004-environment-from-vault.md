# 4. Read the environment and the secrets from Vault

- **Status**: Accepted
- **Date**: 2025-12-13
- **Source**: existing code, transcribed in SCRUM-699

## Context

The app needs keys and URLs at build and run time (API URL, Google Maps key, Tolgee, analytics…).
Copying them in `.env` files on every machine leaks them and lets them drift.

## Decision

- Environment values and secrets live in **Vault**. `bun inject:env` (`tools/vault/inject-env.sh`)
  logs in with an AppRole and injects them into the command it wraps (`bun ios`, `bun android`,
  `bun generate:api`, `bun generate:translations:local`…).
- The only local file is `.env.development` (from `.env.development.example`): the Vault AppRole
  credentials and non-secret switches (`EXPO_PUBLIC_API_ENV`, `EXPO_PUBLIC_LOCAL_SERVER_DEV`), never
  the app's secrets themselves.
- A new variable is added to Vault and read in `app.config.ts` or through `process.env.EXPO_PUBLIC_*`;
  its name goes in `ENVIRONMENTS`.

## Consequences

- One place to rotate a key; nothing secret in git.
- Running the app needs Vault access.
- A key restricted per platform (for example `GOOGLE_MAPS_ANDROID_API_KEY`, Maps SDK for Android
  only) is a separate Vault entry, not a shared key.

## Alternatives considered

- **`.env` files shared by hand**: secrets copied on every machine, no rotation.
