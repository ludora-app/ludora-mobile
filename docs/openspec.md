# OpenSpec in this repo

Spec-driven workflow for functional changes: `openspec/specs/` holds the living specs, `openspec/changes/` the proposals. Driven through the `/opsx:*` commands and the `openspec-*` skills.

The rules an agent needs while working are in the root [`CLAUDE.md`](../CLAUDE.md) → _OpenSpec_. This file holds the reasoning behind them: read it when you are about to change the version or wonder why the setup looks the way it does.

The setup follows the same contract as maiia-officine and maiia-web-pro: same CLI version, same trigger, same archive moment.

## Why we do not document the whole app first

OpenSpec is brownfield-first. `openspec/specs/` starts empty and fills as tickets touch areas. A first change in an undocumented feature writes **only the requirement it changes**, stated as the behaviour will be after the change, not the surrounding screen. Converting the whole app at once tends to produce a large, stale spec nobody trusts.

## Why the trigger is the spec and not the size of the change

"Is this big enough to deserve a proposal" has no stable answer: every author answers it differently. "Does `openspec/specs/**` still describe the product after this merges" has exactly one. It also puts the cost where the value is: a one-line change that flips a rule the spec states **is** a functional change, and a 40-file refactor that leaves every requirement true is not.

The consequence people trip on is bugs. A bug is usually the code disagreeing with a spec that was already right: repairing it needs no proposal, and writing one would falsely record a decision nobody took. Only two bug shapes touch the spec:

- the case it never covered: add the missing **scenario**, so the next regression is caught by the spec rather than by a user;
- the case where the spec itself is wrong: you are choosing new behaviour, which is a proposal like any other.

## Why we archive and sync when the PR goes to review

In OpenSpec's own flow the two are one gesture: `archive` checks `tasks.md`, warns on unticked tasks, and prompts "Sync now (recommended)" before closing the change.

We keep that pairing, and we fire it **when the PR is put in review**, not after merge. The reviewer reads `openspec/specs/**` as ground truth; an active change sitting next to a living spec that is only half-updated is what they cannot judge. Standalone `sync` stays useful mid-implementation. Archive is what tells the next reader the proposal is done.

If QA or review then changes the behaviour, open a **new** change. Un-archiving to patch the same delta is how two stories of "what we decided" end up in the same folder.

## Why it is a global CLI and not a project dependency

That is what upstream prescribes (`npm install -g @fission-ai/openspec`), and since 1.5.0 the generator writes bare `openspec …` commands that only resolve that way. A local dependency would be a trap: generated commands are `openspec …`, not `bunx openspec`.

## Why the version is pinned in a doc rather than in a manifest

Nothing pins it in `package.json`, so `CLAUDE.md` pins it instead: **1.12.0**.

Regenerating with another version rewrites every generated file, and a version that adds a command adds files too. Only the `openspec-*` skills record which version produced them, in a `generatedBy` front matter field; the `/opsx:*` commands carry no version marker at all. Hence the two rules:

- install that version, not `@latest`, unless the team is moving together;
- when you do move, run `openspec update` **in the same PR as the version bump**, and say which version in the description.

## Why the generated files are committed

**The criterion is shared or personal, not generated or hand-written.** The `/opsx:*` commands (`.claude/commands/opsx/`) and the `openspec-*` skills (`.claude/skills/`) encode the team's workflow: everyone should have the same ones, and a clone is expected to work without a setup step. So they stay tracked, and whoever runs `openspec update` commits the result, in the same PR as the version bump. Never hand-edit them: the next `openspec update` overwrites them.

Only Claude Code is configured (`openspec init --tools claude`). If another assistant joins, add it with `openspec update` and the matching `--tools`, in its own PR.

## Why `config.yaml` stays a schema line

Project conventions already live in `CLAUDE.md` and the `ludora-*` skills. Repeating the stack and the rules in `openspec/config.yaml` `context:` would duplicate them, then drift. The schema is `spec-driven`; the rules an agent follows are in `CLAUDE.md`.

## Language

Artifacts (proposal, design, specs, tasks) are written in **English**, like the rest of the repository's docs.
