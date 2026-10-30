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

## Where the truth lives

| Question                        | Source of truth                                                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| What does this ticket ask?      | **Jira** (`SCRUM-<n>`): the criteria, and the QA returns often in the comments                                                        |
| What does the product do today? | **`openspec/specs/`** where a requirement exists. Where it is silent, the code and the ticket are the answer, _and you write the requirement you change_ |
| How is the app built?           | **This file** and the `ludora-*` skills                                                                                               |
| Why is it built that way?       | **`docs/adr/`**: one record per architecture decision. Never rewrite an accepted one: a decision that changes gets a new ADR that supersedes it |

## OpenSpec

Spec-driven workflow for functional changes: `openspec/specs/` holds the living specs, `openspec/changes/` the proposals. Driven through the `/opsx:*` commands and the `openspec-*` skills. Why it is set up this way: [`docs/openspec.md`](docs/openspec.md).

```bash
npm install -g @fission-ai/openspec@1.12.0   # global CLI, never a project dependency
openspec --version                          # 1.12.0, the reference version
```

- Install **1.12.0**, not `@latest`. Bumping means running `openspec update` **in the same PR** and naming the version in the description.
- `.claude/commands/opsx/*` and `.claude/skills/openspec-*` are **generated**: never hand-edit them.
- Artifacts (proposal, design, specs, tasks) are written in **English**.
- **Every feature, redesign or behaviour change starts here**: read the ADRs it touches and cite them in its `design.md`, then code. A feature that needs to go against an ADR stops: the answer is a new ADR that supersedes it, not code that ignores it.

One question decides whether a change needs a proposal: **does it change what `openspec/specs/**` says the product does?**

| The work                                               | OpenSpec                                       |
| ------------------------------------------------------ | ---------------------------------------------- |
| Behaviour added, changed or removed                    | **Proposal**, before the first line of code    |
| Bug where the code contradicts the spec                | **None**: the fix makes reality match it       |
| Bug the spec never covered                             | **Scenario** added to the existing requirement |
| Bug where the spec itself is wrong                     | **Proposal**: you are deciding behaviour       |
| Refactor, perf, typing, dependency, doc, test, tooling | **None**: the PR is the record                 |

Commands:
- `/opsx:explore`: the shape is unclear. Thinking only, no implementation.
- `/opsx:propose`: creates the change with its artifacts (proposal, design, spec delta, tasks).
- `/opsx:apply`: implements the tasks.
- `/opsx:sync`: merges the delta into the living spec **without** archiving.
- `/opsx:update`: revises a change's planning artifacts; never edits code.
- `/opsx:archive`: once the implementation is ready for review.

**Sync and archive when the PR goes to review**, not after it merges. If review or QA then changes the behaviour, open a **new** change.

The specs start empty (brownfield): a change writes only the requirement it touches, not the whole screen.
