# Lint rules in practice

The exact perfectionist setup from `eslint.config.js`, plus 6 real, lint-clean snippets and the error ESLint raises if you break them. Errors below were reproduced by feeding a deliberately mis-ordered copy of the real file to `npx eslint --stdin` (perfectionist 5.12.1, ESLint 9.39.5).

## The config (eslint.config.js)

Rules (lines 59-66):
```js
'perfectionist/sort-imports': ['error'],
'perfectionist/sort-interfaces': ['error'],
'perfectionist/sort-objects': [
  'error',
  {
    type: 'alphabetical',
  },
],
```
Shared settings (lines 81-86):
```js
settings: {
  perfectionist: {
    partitionByComment: true,
    type: 'line-length',
  },
},
```
Other rules that shape code (lines 36-79): `import/extensions` (no extension except `.json`), `no-restricted-imports` for `dayjs` (use `@/lib/dayjs`; the only exemption is `src/lib/dayjs.ts`, lines 89-93), `unused-imports/no-unused-imports: error`, `react/require-default-props` (functions ignored), `react/jsx-props-no-spreading: off`. `src/api/generated/*`, `android/*`, `ios/*`, `tools/*` are ignored (line 23).

What this means:
- **Imports** and **interface members**: `line-length`, ascending (shortest line first). For imports, the whole statement counts; a multi-line import counts as one entry at its total length.
- **Object keys**: `type: 'alphabetical'` set on the rule overrides the shared `line-length`.
- **Partitions**: only a **comment** line starts a new sorted block (`partitionByComment`). No `partitionByNewLine` is configured, so a **blank line does not partition**. Checked: an interface with `longerMemberName` then a blank line then `a` fails with `Expected "a" to come before "longerMemberName"`; the same with `// c` instead of the blank line passes. (`ludora-code-style` SKILL.md §1 says a blank line starts a partition for interfaces; this is not what the config does. Interfaces that look partitioned by blank lines, like `AuthStoreState`, are simply sorted in both halves.)
- Not sorted at all: `type X = {}` members, JSX props, array elements, destructuring.

Run `bun lint:fix` rather than sorting by hand.

## 1. Import groups, shortest first
`src/features/profil/formsheets/profil-edit-name.formsheet.tsx:1-16` (line lengths 24, 39, 40, 42, 45, 46, 54 for externals; 52, 53, 63, 65, 96 for `@/`; 74, 86 relative):
```ts
import { z } from 'zod';
import { useToast } from '@chillui/ui';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useTranslate } from '@tolgee/react';
import { FormInput, Wrapper } from '@ludo/ui';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUserMe } from '@/queries/user-me.query';
import { ErrorResponse } from '@/api/orval.instance';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { useUpdateUserMe } from '@/queries/update-user-me.query';
import FormSheetHeader from '@/components/ui/form-sheet/components/form-sheet-header.component';

import { profilEditNameSchema } from '../schemas/profil-edit-name.schema';
import ProfilEditFooter from '../components/profil-edit/profil-edit-footer.component';
```
Swap `useRouter` and `useForm`: `Expected "expo-router" to come before "react-hook-form"  perfectionist/sort-imports`.

## 2. Multi-line import sorts by total length
`src/features/players/components/players-list/players-list-item/players-list-item.component.tsx:1-17`: the `@/api/generated/model` import is spread over 5 lines and sits last of the `@/` group, below `@/utils/sports.utils`, because its total length is the largest. Relative imports follow after a blank line. A `{ router } from 'expo-router'` (short) leads the external group even though `@ludo/ui` is a "more important" import.

## 3. Alphabetical object keys in a call
`profil-edit-name.formsheet.tsx:44-47`:
```ts
trackEvent({
  data: { is_firstname_changed: !!isFirstnameChanged, is_lastname_changed: !!isLastnameChanged },
  eventName: 'profil_edit_name_success',
});
```
Put `eventName` first: `Expected "data" to come before "eventName"  perfectionist/sort-objects`. Same rule explains `toast({ message, variant })` (lines 49-52) and `{ error, isError, items, totalCount, ...rest }` in `players/queries/get-users-suggestion-by-filter.query.ts:31`. Spreads end the object; keys before it stay sorted.

## 4. Alphabetical keys in a store initializer
`src/features/create-session/store/create-session.store.ts:27-36` and `src/features/players/stores/players-filters.store.ts:19-36`: state fields and actions are interleaved by name, not grouped. Example from the session-team store (`src/features/session/stores/session-team.store.ts:11-15`):
```ts
reset: () => set({ sideTeam: undefined, teamUid: undefined }),
setSideTeam: sideTeam => set({ sideTeam }),
setTeamUid: teamUid => set({ teamUid }),
sideTeam: undefined,
teamUid: undefined,
```
Initial values and setters are not separated; `reset` then `setX` then `sideTeam`/`teamUid` is purely alphabetical.

## 5. Interface members by line length
`src/features/create-session/store/create-session.store.ts:17-25` (member line lengths strictly ascending: 17, 18, 24, 36, 38, ...):
```ts
interface CreateSessionStore {
  session: Session;
  reset: () => void;
  isStep3Valid: boolean;
  createdSessionUid: string | null;
  setSession: (session: Session) => void;
  setIsStep3Valid: (isStep3Valid: boolean) => void;
  setCreatedSessionUid: (createdSessionUid: string) => void;
}
```
Swap `session` and `reset`: `Expected "session" to come before "reset"  perfectionist/sort-interfaces`. Contrast with `PlayersFiltersStore` (`players-filters.store.ts:12-17`): `reset`, `numberOfFilters`, `filters`, `setFilters` is length order, not the alphabetical order of the object below it. Interfaces and the object literal that implements them are sorted by different rules.

## 6. Comment as a partition
`src/constants/analytics-events.constants.ts:115-` (`AnalyticsEventData`): `// onboarding events` (116), `// auth events` (125), then further group comments. Each comment restarts line-length sorting, so a new group of events can be appended under its own comment without re-sorting the whole interface. Use this (a comment, not a blank line) when a store shape needs state and actions sorted separately.

Same mechanism for objects: a comment inside an object literal restarts the alphabetical check for the keys below it.

## Practical checks
- One file: `npx eslint <path>`. Everything: `bun lint:fix && bun ts:check`.
- If `lint:fix` reorders an import you did not touch, the file was previously unsorted (drift); keep the fix.
- Do not disable perfectionist rules inline; restructure with a comment partition instead.
