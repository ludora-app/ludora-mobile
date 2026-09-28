# Ludora mobile

Expo SDK 57 / React Native 0.86 app. Stack: Expo Router, `@ludo/ui` (over `@chillui/ui`), Uniwind, TanStack Query via Orval, Zustand, Tolgee, react-hook-form + zod. Package manager: **bun**.

## Before writing any code

Load the project skills:
- **`ludora-feature`** (architecture and workflow) and **`ludora-code-style`**: always.
- `ludora-ui`, `ludora-data`, `ludora-navigation`: depending on the task.
- `ludora-native-build`: build or upgrade issues.
- `ludora-ship`: commits and PRs.

These skills override generic advice.

## Commands

- `bun lint:fix && bun ts:check`: must pass before any commit (the pre-commit hook runs lint + ts:check).
- `bun ios` / `bun android`: env comes from Vault via `inject:env`.
- `bun generate:api`: regenerates `src/api/generated/` (gitignored, never edit).
- `bun generate:icons`: regenerates the icon constants.

## Critical rules

- Imports are sorted by **line length**, and object keys are **alphabetical** (ESLint perfectionist).
- Route files in `src/app` only re-export a screen. Sheet and modal options go in **both** `(root)/_layout.tsx` and `_layout.ios.tsx`.
- Backend calls go only through generated Orval hooks wrapped in `*.query.ts`, with `useInvalidate*` in `onSuccess`.
- No hard-coded UI strings: use `t('key')` from Tolgee, and list the new keys for the user.
- Branches are `<type>/SCRUM-<n>` off `develop`. Commits are `type(SCRUM-<n>): lowercase subject`.
