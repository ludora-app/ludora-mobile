# Claude Code in CI

Claude Code runs non-interactively in GitHub Actions through [`anthropics/claude-code-action@v1`](https://github.com/anthropics/claude-code-action). It authenticates with a Claude Max subscription (`CLAUDE_CODE_OAUTH_TOKEN`), never with an Anthropic API key.

| Workflow            | Trigger                                                                                                     | What Claude does                                                                                           | Active from |
| ------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------- |
| `pr-check.yml`      | Any PR, every push                                                                                          | No Claude: `bun lint` and `bun ts:check`                                                                   | the PR      |
| `claude-review.yml` | PR into any branch but `main` opened, or moved out of draft (not the `develop` → `staging` promotion)       | Reviews the diff, comments only                                                                            | the PR      |
| `claude.yml`        | `@claude` in a PR comment, inline comment or review                                                         | Answers, fixes and pushes on the PR branch                                                                 | `main`      |
| `claude-jira.yml`   | Jira ticket labelled `claude` + `mobile`, or a Jira comment starting with `@claude` (`repository_dispatch`) | Implements the ticket and opens a PR into the target branch (`develop` by default), or updates the open PR | `main`      |

`issue_comment`, `repository_dispatch` and `workflow_dispatch` always run the workflow file from the default branch, so `claude.yml` and `claude-jira.yml` change behaviour only once they reach `main`. `pull_request` workflows run the file from the PR itself.

All of them prepare the repo with the composite action `.github/actions/setup-ludora` (bun, envconsul, the `ludora-back` swagger, `generate:api`, `generate:translations:local`, `generate:icons`), the same preparation as `ci.yml`. Claude can then run `bun check:all`, and the husky pre-commit hook runs on its commits. bun is pinned to the version that writes `bun.lock` locally (`1.3.14`): a newer bun rewrites the lockfile and `--frozen-lockfile` fails, so bump both together.

## Setup (once)

1. Install the [Claude GitHub app](https://github.com/apps/claude) on `ludora-app/ludora-mobile`. Comments, commits and PRs are then made as `claude[bot]`.
2. Run `claude setup-token` locally with the Max account. It prints a token valid for one year.
3. Add the repository secrets (Settings → Secrets and variables → Actions):

   | Secret                    | Value                                                                                                          |
   | ------------------------- | -------------------------------------------------------------------------------------------------------------- |
   | `CLAUDE_CODE_OAUTH_TOKEN` | The `claude setup-token` output                                                                                |
   | `JIRA_BASE_URL`           | `https://<site>.atlassian.net`, without a trailing slash                                                       |
   | `JIRA_EMAIL`              | Email of the Atlassian account that reads tickets and posts the comments                                       |
   | `JIRA_API_TOKEN`          | An API token of that account ([id.atlassian.com](https://id.atlassian.com/manage-profile/security/api-tokens)) |
   | `ICONSAX_API_KEY`         | The Iconsax API key, without the `Bearer` prefix                                                               |
   | `TOLGEE_CI_API_KEY`       | A Tolgee **project** API key (`tgpak_…`) dedicated to the CI, see below                                        |

   `GH_TOKEN`, `EXPO_PUBLIC_API_ENV` and the `VAULT_*` secrets already exist for `ci.yml` and are reused.

4. Never add `ANTHROPIC_API_KEY` to the repository: it would take precedence and bill the API.

Renew the OAuth token before it expires: every Claude job fails with an authentication error once it does.

## PR review (`claude-review.yml`)

- Runs on `opened` and `ready_for_review` only, not on every push, to spare the quota. To get a new review after pushing fixes, mark the PR as draft and back to ready.
- Skipped for drafts, PRs from forks (they get no secrets) and PRs opened by bots, except `claude[bot]`: the PRs opened from Jira are reviewed too.
- The prompt is in the workflow file. It reads `CLAUDE.md`, the matching `ludora-*` skills and the ADRs the diff touches, then looks for bugs, project rules, ADR violations and a missing OpenSpec change. It comments in French: one inline comment per issue, then one summary comment.
- Claude can only read the repo and comment: no push, no approval, no file edit.

## `@claude` in a pull request (`claude.yml`)

- Write `@claude <request>` in a PR comment, an inline review comment or a review body. Issues are not handled: tickets live in Jira.
- Only `OWNER`, `MEMBER` and `COLLABORATOR` comments start the job, and the action checks write access again. An outside comment triggers nothing.
- The setup runs on the default branch code, never on code from the PR. The action then checks out the PR branch, so a PR that changes dependencies is linted with the `main` install.
- Claude may edit files, run `bun check:all`, `bun test`, `bun generate:icons`, the dependency commands (`bun install`, `bun add`, `bun remove`, `bun update`, `bun outdated`, `bun run doctor`, `bunx expo install`), read docs on `docs.expo.dev`, `expo.dev`, `github.com` and `npmjs.com` only, read-only `git` and `gh pr` commands, use the Iconsax and Tolgee MCP servers, then commit and push **on the PR branch only**. Commits follow `type(SCRUM-n): subject`, with the key taken from the branch name.

## Jira ticket to pull request (`claude-jira.yml`)

1. The workflow validates the key (`SCRUM-<n>`) and looks for an open PR on `<type>/SCRUM-<n>`: there is one, the run **updates** it; there is none, it **creates** one.
2. It checks out the target branch (create, `develop` by default, see [Target branch](#target-branch)) or the PR branch (update), then reads the ticket through the Jira REST API: summary, description, labels, comments, the latest comment starting with `@claude`, and the attachments. The ticket and its attachments are written outside the workspace, never printed in the logs.
3. Nothing happens if the ticket does not carry both `claude` and `mobile`. In create mode, the run stops before Claude starts if `<type>/SCRUM-<n>` already exists without an open PR (a merged or closed PR left it behind): delete the branch or reopen the PR, then trigger again.
4. **Create**: Claude creates `<type>/SCRUM-<n>`, writes an OpenSpec change first when the ticket changes behaviour, implements, runs `bun check:all` and commits. **Update**: Claude reads the existing commits, the diff and the PR discussion, applies the latest `@claude` request with new commits, and writes a new OpenSpec change if the behaviour changes again. It answers `unchanged` when there is nothing to do. It never pushes, rebases or amends.
5. The workflow then checks the branch name, the commit (and PR title) format, that `.github/` is untouched and, in update mode, that the history was not rewritten. It runs `bun lint` and `bun ts:check` again, then pushes (never a force push). Create opens the PR into the target branch; update pushes on the PR and comments a summary of the changes on it.
6. A comment on the ticket gives the PR link, says that nothing changed, or gives the reason and the run link when Claude stopped or a check failed. It never starts with `@claude`, so it cannot trigger a new run.

### Target branch

The PR targets `develop` unless the ticket description has a line with the branch to target:

> Target: feat/SCRUM-700

`Cible :` works too, and bold or italic markup around the word is fine. The branch must exist on GitHub, and `main` is refused. The target only applies when the PR is created: an update keeps the base of the open PR.

Use it for a hotfix on `staging`, or to build on a branch that is not merged yet (stacked PRs). `claude-review.yml` and `pr-check.yml` run on PRs into any branch but `main`.

### Changing a ticket after the PR is open

Editing the description or the attachments triggers nothing. Once the change is in the ticket, add a **Jira comment starting with `@claude`** that says what changed, for example:

> @claude les formats de jeu sortent de l'étape 1. Nouvelle maquette dans `maquette-v2.zip`, à faire : écrans 1-1 à 1-3 seulement.

| Where             | When                                                              | What Claude sees                                                       |
| ----------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Jira comment      | The **need** changes: a new decision, a new mockup, new criteria  | The updated ticket and attachments, the work already on the branch     |
| GitHub PR comment | The **code** needs a fix: a bug, a review remark, a specific line | The code and the PR discussion, not the Jira ticket or its attachments |

When a mockup changes, prefer replacing the old attachment. If both stay, the newest one wins: attachments are listed with their date, newest first.

To test without Jira: Actions → Claude Jira → Run workflow, with a ticket key (the workflow must be on `main`).

### Mockups and attachments

The CI cannot open Claude Design, Figma or any link that needs a sign-in: claude.ai links answer `403` to a client without a browser session, and the `setup-token` token has no design scope. Mockups reach Claude as **ticket attachments**.

- Accepted types: `png`, `jpg`, `jpeg`, `gif`, `webp`, `svg`, `pdf`, `md`, `txt`, `json`, `html`, `htm`, `css`, `zip`. Up to 20 MB per file. Other files are skipped.
- A `zip` is extracted (at most 1,000 files and 200 MB once extracted). Absolute and `../` paths stay inside the extraction folder, and symbolic links become plain files.
- A Claude Design export (the `*.dc.html` files with `support.js`, `assets/` and any `DECISIONS-*.md`, zipped) is the best input: Claude reads the HTML source, with the exact texts, colours and layout.
- A canvas holds every screen of a flow, including the variants set aside. **The ticket names the screens to build** (for example "section C, screens C1 to C6"): Claude implements only those.

### Jira Automation rules

Shared with `ludora-back` (SCRUM-707): one set of rules per repo, or one with an if/else on the label. Two rules call the same web request.

**Rule 1: implement the ticket**

1. **Project settings → Automation → Create rule.**
2. **Trigger**: _Work item created_, and a second rule (or a branch) on _Field value changed_ → `Labels`.
3. **Conditions**:
   - _Work item fields condition_: `Labels` contains `claude`;
   - _Work item fields condition_: `Labels` contains `mobile`;
   - _User condition_: the initiator is in the team (not an outside reporter).
4. **Action → Send web request**:
   - URL: `https://api.github.com/repos/ludora-app/ludora-mobile/dispatches`
   - Method: `POST`
   - Headers: `Accept: application/vnd.github+json`, `Authorization: Bearer <token>`, `X-GitHub-Api-Version: 2022-11-28`
   - Body (custom data): `{"event_type": "jira-claude", "client_payload": {"key": "{{issue.key}}"}}`
5. The token is a GitHub **fine-grained** personal access token limited to `ludora-mobile` and `ludora-back`, permission **Contents: read and write** (the minimum for `repository_dispatch`). Store it only in the Jira rule, and note its expiry date.

**Rule 2: update the PR from a comment**

1. **Trigger**: _Work item commented_.
2. **Conditions**:
   - _Advanced compare condition_: first value `{{comment.body.toLowerCase()}}`, condition _matches regular expression_, regular expression `(?s)\s*@claude.*` (the comment starts with `@claude`);
   - _Work item fields condition_: `Labels` contains `claude` and `mobile`;
   - _User condition_: the comment author is in the team.
3. **Action**: the same _Send web request_ as rule 1.

GitHub answers `204 No Content` when the dispatch is accepted. The rule's audit log shows the response.

## MCP servers in the CI

`claude.yml` and `claude-jira.yml` give Claude two MCP servers, written by the composite action `.github/actions/claude-mcp`. A server whose secret is missing is left out, and Claude falls back to listing what is left to do.

| Server  | Allowed tools                                                                                                 | Use                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Iconsax | search and get (free and Pro sets)                                                                            | A missing icon, following the `ludora-icons` skill, then `bun generate:icons`. The SVG is committed in the PR. |
| Tolgee  | `search_keys`, `get_key`, `list_keys`, `list_namespaces`, `list_languages`, `get_translations`, `create_keys` | Creates the new keys (fr and en). Changing or deleting a key is not allowed.                                   |

Claude Design cannot be added: it needs an OAuth sign-in in a browser (`user:design:*` scopes), see [Mockups and attachments](#mockups-and-attachments).

Tolgee:

- Create a **project API key** for the CI (Tolgee → Ludora project → Integrate → API keys), not a personal token. Scopes: `keys.view`, `keys.create`, `translations.view`, `translations.edit`. Set an expiry date.
- Keys are created in Tolgee **before** the PR is reviewed. If the PR is dropped or changed, delete the orphan keys: the PR body lists every key Claude created.
- `locales/*.json` is not refreshed in the CI. Run `bun generate:translations:local` locally after the merge.

## Discord notifications

Every Claude workflow posts what Claude starts, does and ends in a Discord channel, through the composite action `.github/actions/discord-notify`. Without the secret, nothing is posted.

| Setting                  | Where                                                             | Value                                                                                     |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `DISCORD_WEBHOOK_CLAUDE` | Secret                                                            | The channel webhook (channel settings → Integrations → Webhooks → New webhook → Copy URL) |
| `DISCORD_MENTION`        | Variable (Settings → Secrets and variables → Actions → Variables) | Who is pinged when action is needed: `<@user id>` or `<@&role id>`. Empty means no ping.  |

| Workflow               | Start                                                      | End                                                                                               |
| ---------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `claude-jira.yml`      | 🚀 started working on SCRUM-n / 🔁 picked SCRUM-n up again | ✅ opened PR #n · 🔄 updated PR #n · 💤 changed nothing · ⛔ blocked · ⚠️ usage limit · ❌ failed |
| `claude-review.yml`    | 👀 started reviewing PR #n                                 | 📝 reviewed PR #n: counts by severity, or nothing to report · ⚠️ · ❌                             |
| `claude.yml`           | 🤖 started working on PR #n                                | 🛠️ pushed n commits · 💬 answered · ⚠️ · ❌                                                       |
| `claude-pr-closed.yml` |                                                            | 🗑️ a Claude PR was closed without merge: delete its Tolgee keys                                   |

The mention is only added to ⛔, ⚠️ and ❌. Messages carry the ticket title and links (PR, Jira, logs), never the ticket description. A Jira run stopped before the checkout (an invalid `Target`) is reported in Jira only.

## Limits

- **Shared quota.** CI runs draw from the same Max usage (5-hour window and weekly limit) as local Claude Code and the backend. Every Claude workflow shares the `claude` concurrency group, so only one runs at a time. GitHub keeps one run pending per group: a third trigger while one runs and one waits replaces the waiting one.
- **Public repo.** Actions logs are public. `show_full_output` stays `false`, so tool results and file contents never reach the logs, and the ticket content is never printed.
- **No merge, ever.** Claude opens and updates PRs, a human reviews and merges them.
- **No device test.** The CI only lints and type-checks.
- **Not the final word.** Claude reviewing code that Claude wrote catches rule and context misses, but shares the model's blind spots.
