# 3. Manage the translations in a self-hosted Tolgee

- **Status**: Accepted
- **Date**: 2025-12-13
- **Source**: existing code, transcribed in SCRUM-699

## Context

The app ships in French (base language) and English. Texts change more often than code, and must be
editable without a developer editing JSON files by hand.

## Decision

- Translations live in **Tolgee, self-hosted** (Coolify), project languages `fr` (base) and `en`.
- The code uses `t('<namespace>.<key>')` from `@tolgee/react`; no hard-coded user-facing string.
- `locales/*.json` are **generated** from Tolgee (`bun generate:translations:local`) and never edited
  by hand.
- New keys are created in Tolgee (through its MCP server or its UI), with the French and English text,
  in the same change as the code that uses them. A key is deleted only after checking that no code
  uses it.

## Consequences

- Texts can be fixed in Tolgee without touching the code.
- A key forgotten in Tolgee shows raw on screen: creating it is part of the change.
- Tolgee becomes infrastructure to run and back up.

## Alternatives considered

- **JSON files edited in the repository**: every text change needs a developer and a release.
