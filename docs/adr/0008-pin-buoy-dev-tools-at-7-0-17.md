# 8. Pin the Buoy dev tools at 7.0.17

- **Status**: Accepted
- **Date**: 2026-11-09
- **Source**: SCRUM-708 (dependency upgrade to Expo SDK 58)

## Context

Buoy (`@buoy-gg/*`) provides the floating dev tools panel: the React Query inspector, debug
borders, highlighted re-renders and route events. It is mounted by
`src/providers/dev-tools.provider.tsx`, only in development (`__DEV__` or `EXPO_PUBLIC_ENV=development`),
and never ships to players.

SCRUM-708 bumped Buoy from 7.0.17 to 7.0.88. The newer versions ask every developer to sign in with
a buoy.gg account before the tools work. The team does not want an account and a sign-in step for a
dev-only tool.

The packages depend on each other with `^` ranges (`@buoy-gg/core@7.0.17` asks for
`@buoy-gg/shared-ui@^7.0.17`), so pinning the direct dependencies alone still lets the internal
packages move to a newer version.

## Decision

- The five direct dependencies are pinned to the exact version `7.0.17`: `@buoy-gg/core`,
  `@buoy-gg/debug-borders`, `@buoy-gg/highlight-updates`, `@buoy-gg/react-query`,
  `@buoy-gg/route-events`.
- The internal packages are pinned to `7.0.17` through `overrides` in `package.json`:
  `@buoy-gg/floating-tools-core`, `@buoy-gg/floating-tools-react`, `@buoy-gg/license`,
  `@buoy-gg/shared-ui`.
- A dependency upgrade never bumps `@buoy-gg/*`, even when `bun outdated` lists it.

## Consequences

- The dev tools keep working without an account.
- Buoy no longer gets fixes or new tools. A future React Native version can break 7.0.17; it has
  no native code, so a break shows in Metro or at runtime, not in the native build.
- `bun outdated` keeps listing the packages: dependency PRs list them as held back, with this ADR as
  the reason.
- Moving Buoy again means removing the `overrides` entries along with the exact pins.

## Alternatives considered

- **Upgrade and sign in**: an account per developer and per CI run for a dev-only tool.
- **Remove Buoy**: loses the React Query inspector and the dev tools entry points
  (DevTool, Storybook) the team uses daily.
- **Pin the direct dependencies only**: the internal packages drift to newer versions and Buoy runs
  as a mix of versions.
