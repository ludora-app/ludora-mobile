---
name: ludora-code-style
description: MUST be loaded before writing or editing ANY TypeScript/TSX in the Ludora mobile repo (ludora-mobile). Defines the author's exact code style — ESLint perfectionist sorting (imports by line length, object keys alphabetical), Prettier, TypeScript habits (type vs interface, no enums, no `!`), naming (file suffixes, handleX/onX, isX/hasX), function style, React Compiler purity rules, comments and logging. Use together with ludora-feature / ludora-ui / ludora-data / ludora-navigation.
---

# Ludora code style

Goal: code indistinguishable from the author's. When this doc and nearby code disagree, check which is **newer** (`git log -1 --format=%ad -- <file>`) — the newer pattern wins. Known outdated patterns are listed at the end.

**Precedence:** the `ludora-*` skills describe this repo and override generic skills (e.g. `react-native-best-practices` advice on barrels, FlashList or memoization) whenever they disagree.

## 1. Lint & format rules that change how you write

ESLint (`eslint.config.js`): airbnb → expo → prettier, plus perfectionist with `type: 'line-length'`, `partitionByComment: true`.

- **Imports — sorted by line length (shortest first), NOT alphabetically**, in 3 groups separated by a blank line:
  1. external (`react`, `expo-router`, `@ludo/ui`, `@chillui/ui`, `@tolgee/react`, `zod`, `@generatedApi/...`, `assets`)
  2. internal `@/...`
  3. relative `./` `../`
  ```ts
  import { useMemo } from 'react';
  import { useTranslate } from '@tolgee/react';
  import { Box, Button, ScreenLayout, String } from '@ludo/ui';
  import { useLocalSearchParams, useRouter } from 'expo-router';

  import ROUTES from '@/constants/routes.constants';
  import { useAnalytics } from '@/hooks/analytics-trackers.hook';

  import ProfilHeader from '../components/profil-header.component';
  ```
- **Object literal keys — alphabetical** everywhere (store initializers, `toast({ message, variant })`, `trackEvent({ data, eventName })`, `router.navigate({ params, pathname })`, returned objects `return { data, isLoading, refetch }`, query options). A comment line starts a new sorted partition.
- **Interface members — sorted by line length**; a blank line starts a new partition (e.g. state fields, blank line, actions).
- `type X = {}` members and JSX props are **not** sorted — keep them logical.
- `no-restricted-imports`: never `import dayjs from 'dayjs'` → `import dayjs from '@/lib/dayjs'`.
- No file extensions in imports (except `.json`). Unused imports are errors.
- airbnb: `no-console` (every console needs `// eslint-disable-next-line no-console`), `no-nested-ternary`, `no-param-reassign`, `consistent-return` (effects that sometimes return a cleanup end with `return undefined;`), `class-methods-use-this` (→ `static`).
- Prettier: 120 cols, 2 spaces, **semicolons**, single quotes, trailing commas `all`, `arrowParens: avoid` (`state => state.x`), tailwind class sorting. Files without semicolons are drift, not style.
- Don't hand-sort: run `bun lint:fix` then `bun ts:check` (= pre-commit hook). Both must pass.

## 2. React Compiler purity (react-hooks v7 rules — enforced)

- Never read/write `ref.current` during render; do it in effects/handlers.
- Lazy one-time instance: `const [store] = useState(() => createStore())`, not `useRef` lazy init.
- Don't sync props → state in a `useEffect`; derive during render or adjust state at render time.
- react-hook-form values: `useWatch({ control, name })`, not `watch()`.
- Trivial derived values inline (`const isFinished = !!endDate && isAfterNow(endDate);`) — no `useMemo` for cheap booleans. Keep `useMemo`/`useCallback` for objects/elements/handlers passed to `List`, styles, and query filter objects.

## 3. TypeScript

- `strict: true`. **`type XProps = {...}`** right above the component (not `interface`; interface is the older pattern). Zustand store shapes: `interface XStore` is fine.
- **No new `enum`.** Use union types (`type View = 'actions' | 'report-reasons'`) or `UPPER_SNAKE` const objects `as const` + derived type (`(typeof X)[keyof typeof X]`).
- **No non-null `!`.** Guard with `?.`, `??`, `|| {}`, early return.
- Prefer `unknown` in catch; cast API errors with `error as ErrorResponse` (`@/api/orval.instance`). `any` is tolerated only at interop edges.
- Helpers take one destructured object with an inline type: `({ maxLength, str }: { str: string; maxLength: number })`.
- Reuse generated DTOs from `@/api/generated/model` (and their const-enums as values: `SessionCollectionItemDtoSport.BASKETBALL`) instead of redeclaring shapes.
- Utility types in use: `StrictOmit` (`@chillui/ui`), `Flatten` (`@/types`), `Record`, `Partial<Record<>>`, `ReturnType<typeof useX>['field']`, `ComponentProps['prop']`, `z.infer<ReturnType<typeof schemaFactory>>`.

## 4. Naming

- Files: kebab-case + suffix — `.screen.tsx`, `.component.tsx`, `.formsheet.tsx`, `.modal.tsx`, `.query.ts`, `.store.ts`, `.hook.ts` (no `use-` prefix in filename), `.schema.ts`, `.types.ts`, `.constants.ts`, `.utils.ts`, `.context.ts(x)`, `.initializer.tsx`, `.provider.tsx`, `.service.ts`, `.styles.ts`.
- Child component files: `<parent>-<child>.component.tsx` inside a folder named after the parent.
- Components PascalCase matching the file: `ProfilEditNameFormsheet`, `PlayersListItem`. The domain word is French **"Profil"** — keep it.
- Local handlers `handleX` (`handleSubmit`, `handlePressChatIcon`); callback props `onX`; form submit `const onSubmit = async (data: XSchema) => {}`.
- Booleans `is/has/can/should/show` — also for props (`hasTopSafeArea`, `isLoading`).
- Rename query/mutation results: `const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe();`.
- Hooks `useX`; query wrappers `useGetX` / `useAddX` / `useJoinX`; stores `useXStore`.
- Module constants `UPPER_SNAKE`: `LIMIT = 10`, `ITEM_HEIGHT = 81`, `MOUNT_WINDOW_MS = 5_000`.

## 5. Function style

- Components: `export default function Name(props: NameProps) {` then `const { a, b = default } = props;` on the first line (alphabetical). Signature destructuring is OK for memo'd list items with 1–2 props. Never `React.FC`, never arrow components, no `forwardRef` (React 19: `ref` is a prop).
- Memoized components: `function X() {}` + `export default memo(X);` at the bottom.
- Hooks, queries, utils: `export const useX = () => {}` arrow functions, named exports.
- Private helpers in a component file: module-level `function getX() {}` above the component.
- Early returns everywhere; one-liners allowed: `if (!userId) return;`.
- JSX: `{cond && <X />}` for show/hide, `cond ? <A /> : <B />` for either/or. Not `? <X /> : null`.
- `async/await` + `try/catch`, never `.then` chains.

## 6. Constants, utils, types, barrels

- `ROUTES` and `COLORS` are default exports (`import ROUTES from '@/constants/routes.constants'`; `COLORS` from `@/constants/colors.contstants` — typo is the real path). Every other constants file uses named `UPPER_SNAKE` exports.
- Utils: small named arrow exports, no default export.
- Feature types: `features/<f>/types/<f>.types.ts`. Global: `src/types`.
- Barrels only for shared UI (`src/components/ui/<x>/index.ts`) and the `@ludo/ui` / `@chillui/ui` roots. **No barrels in features** — import files directly; relative paths inside a feature, `@/` across features.
- Platform: `IS_IOS` / `IS_ANDROID` from `@/constants/platform.constants`, not `Platform.OS`.
- Env: `process.env.EXPO_PUBLIC_*` read into a module-level const; env names in `ENVIRONMENTS`.

## 7. Comments & logging

- **English** comments (French comments are older code). Low density, explain *why* (platform quirk, perf, React Compiler). Short JSDoc on exported hooks/utils/services.
- Section markers in long JSX/layouts: `{/* ──────────── Profil Edit ──────────── */}` or `{/* SECTION 1 : TEAMS */}`.
- No stray `console.log`. Debug logs gated by `if (__DEV__)` with the eslint-disable comment. Errors go to `useAnalytics().trackError`, not console.
- Silence RN warnings via `ignoreLogs([...])` (`@/utils/ignore-logs.utils`) in `src/app/_layout.tsx`, with a comment.

## 8. Don't copy these (outdated / drift)

`interface XProps` · French comments · `TouchableOpacity` · `Platform.OS` · `store/` folder (use `stores/`) · `.query.tsx` (use `.query.ts`) · untyped `useLocalSearchParams()` · string-literal routes · `src/hooks/navigation.hook.ts` (use `navigation.hooks.ts`) · `estimatedItemSize` on List · `useFlatlistHook` · primitives imported from `@chillui/ui` or `@/components/ludo-ui` (use `@ludo/ui`) · files without semicolons · misnamed files (`… copy.ts`, `invite-friends-query.ts`, `register.hook.tsx`).
