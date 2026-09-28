---
name: ludora-ship
description: Use when committing, creating a branch, or opening a pull request in the Ludora mobile repo — Jira-scoped conventional commits, branch naming, PR base branch and pre-commit checks.
---

# Ludora git & PR conventions

## Branches

- Work branches off `develop`, named `<type>/SCRUM-<n>` (e.g. `feat/SCRUM-636`, `fix/SCRUM-669`, `chore/SCRUM-668`).
- Flow: feature branch → PR into `develop` → `develop` merged into `staging` (pre-release `-next`) → `staging` into `main` (release). semantic-release publishes versions and `chore(release): x.y.z [skip ci]` commits — never write those by hand or touch `CHANGELOG.md`.
- Ask the user for the Jira ticket number if it isn't known (branch name, conversation, or Atlassian MCP).

## Commits (commitlint + semantic-release)

Format: `<type>(SCRUM-<n>): <subject>` — the scope is the Jira key.

- Types: `feat` (minor), `fix` / `perf` / `refactor` / `style` / `docs` / `revert` / `hotfix` (patch), `test` / `build` / `ci` / `chore` (no release).
- Subject lower-case, imperative, no trailing period; must not be sentence-case/start-case/PascalCase/UPPER.
- Breaking change: `feat(SCRUM-n)!:` or a `BREAKING CHANGE:` footer.
- Example: `fix(SCRUM-669): enhance FCM token retrieval with error handling`.
- Note: `commitlint.config.js` declares `scope-case: lower-case`, but there is no `commit-msg` hook, so it is never enforced and the team convention is the uppercase Jira key. Keep `SCRUM-<n>` uppercase.

## Pre-commit

Husky runs `bun lint` and `bun ts:check`. Run `bun check:all` (lint:fix + ts:check) before committing so the hook doesn't fail. Never bypass with `--no-verify`.

## Pull requests

- `gh pr create --base develop`, title identical to the commit format (`<type>(SCRUM-<n>): <subject>`); squash merge appends `(#PR)`.
- Body: what changed and why, how it was tested (simulator/device, platform), and any follow-up (e.g. a temporary patch to remove, Tolgee keys to create, `bun generate:api` needed).
- CI (`.github/workflows/ci.yml`) regenerates the API from the backend swagger and validates on push to develop/staging/main.
