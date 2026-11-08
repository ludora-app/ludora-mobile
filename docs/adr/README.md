# Architecture decision records

Why the Ludora mobile app is built the way it is. Each file records **one** decision: its context,
what was decided, what it costs, and what was set aside.

The first records (0001 to 0004) transcribe decisions that already governed the code when this
directory was created (SCRUM-699). Their **Source** line says so.

## Decisions

| #    | Decision                                                                                                  | Status   |
| ---- | --------------------------------------------------------------------------------------------------------- | -------- |
| 0001 | [Build the screens on `@ludo/ui`, an app layer over chill-ui](0001-ui-on-ludo-ui-over-chill-ui.md)        | Accepted |
| 0002 | [Reach the backend only through the generated client](0002-backend-through-the-generated-client.md)      | Accepted |
| 0003 | [Manage the translations in a self-hosted Tolgee](0003-translations-in-tolgee.md)                         | Accepted |
| 0004 | [Read the environment and the secrets from Vault](0004-environment-from-vault.md)                         | Accepted |
| 0005 | [Search places with IGN first, Google Places as a fallback](0005-place-search-ign-first-google-fallback.md) | Accepted |
| 0006 | [Render maps natively with expo-maps](0006-native-maps-with-expo-maps.md)                                 | Accepted |
| 0007 | [Send the play area as coordinates only, never the address](0007-play-area-as-coordinates-only.md)        | Accepted |

An **Accepted** record can still list open questions: the decision stands, the details it names are
not settled yet.

## ADR, OpenSpec or CLAUDE.md?

| You are recording…                                                                                       | Where                                            |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| A choice of architecture: a library, where data lives, a third-party service, a contract with the backend | **An ADR**                                       |
| What the app does for the player                                                                          | **`openspec/specs/`** (proposal first)           |
| How to work in the code: conventions, commands, folders                                                   | **`CLAUDE.md`** and the `ludora-*` skills         |

A feature usually needs no ADR: it applies the existing ones, and its own design choices go to the
`design.md` of its OpenSpec change. Write an ADR when the choice will constrain the next features
(a new library, a new external service, a rule about personal data).

## Lifecycle

- **An accepted ADR is never rewritten.** It is the dated trace of what was decided and why. Fixing a
  typo or a broken link is fine; changing what it says is not.
- **A decision that changes gets a new ADR**, which states what it replaces. The old one only gets
  its status changed to `Superseded by [ADR-XXXX](…)`, and the index follows.
- **A Proposed ADR** can be edited until it is decided; it then becomes `Accepted`.
- **Open questions** of an accepted ADR are answered by a new ADR when the answer is architectural,
  or by an OpenSpec change when it is product behaviour.

## Adding one

1. Copy [`template.md`](template.md) to `NNNN-short-title.md`, with the next free number.
2. Fill it in English, in the present tense, short enough to read in five minutes.
3. Add it to the table above, and set `Superseded by` on the record it replaces, if any.
4. Open it in the PR of the change it decides, or alone when the decision comes first.
