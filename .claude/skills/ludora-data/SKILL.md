---
name: ludora-data
description: Use for anything touching data or state in the Ludora mobile app — calling a backend endpoint, writing a *.query.ts wrapper (query, infinite/cursor list, mutation), invalidating the cache, handling API errors, Zustand stores (global, feature, persisted, context-scoped), react-hook-form + zod schemas, websocket events, push, analytics events, auth tokens, or regenerating the Orval client (bun generate:api).
---

# Ludora data & state

## 1. The generated API (Orval)

- Hooks are generated from the backend Swagger into `src/api/generated/` — **gitignored and regenerated** (`bun generate:api`, needs vault; if auth fails ask the user to run `! bun generate:api`). Never edit or hand-write anything there; never write raw `ky`/fetch calls for backend endpoints.
- Naming after post-processing: `use<Tag><Op>` (`useSessionsFindOne(uid, { query })`, `useSessionsCreate({ mutation })` → `mutateAsync({ data })`), `use<Tag><Op>Infinite` for every `/collection` GET (cursor param), `get<Tag><Op>QueryKey`, and `useInvalidate<Tag><Op>()` in `invalidate-queries.ts`.
- Imports: `@generatedApi/<tag>/<tag>.api`, types from `@/api/generated/model`.
- If an endpoint/DTO is missing, the backend swagger must be regenerated — tell the user, don't fake types.
- `src/api/hooks` + `src/api/queries` are only for non-Orval calls (refresh token, Google Places, CRM). Don't add backend endpoints there.

## 2. Query wrappers — `<verb>-<thing>.query.ts`

Location: `features/<f>/queries/` if one feature uses it, `src/queries/` if shared. **Search first** (`grep -rn "use<Tag><Op>" src`) — a wrapper may already exist.

**Single GET**
```ts
import { useFieldsFindOne } from '@generatedApi/fields/fields.api';

import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

export const useGetField = (id: string) => {
  const query = useFieldsFindOne(id, { query: { enabled: !!id } });
  const { data, error, isError, ...rest } = query;

  useGetMethodErrorTracking({ error, extra: { context: 'useGetField' }, isError });

  return { data: data?.data, ...rest };
};
```
- Always unwrap the `{ data }` envelope; always `useGetMethodErrorTracking` (silent PostHog, no toast).
- `enabled: !!id` or an `isEnabled` arg. No `select` — transform after the hook.
- Expected 404: custom `retry` returning false on `(error as ErrorResponse)?.api_error_status === 404`, skip tracking for it, return `data: undefined` (see `src/queries/get-session-by-id.query.ts`).
- Defaults: staleTime 1 min, gcTime 1 h; `staleTime: Infinity` for rarely-changing data.

**Infinite list** (cursor)
```ts
const LIMIT_RESULTS = 10;

export const useGetSessionsByFilter = () => {
  const filters = useHomeSessionsFiltersStore(state => state.filters);
  const params = useMemo(() => ({ ...filterObjectEntries(filters), limit: LIMIT_RESULTS }), [filters]);

  const { data, error, isError, ...rest } = useSessionsFindAllInfinite(params, {
    query: { getNextPageParam: lastPage => lastPage?.data?.nextCursor },
  });

  useGetMethodErrorTracking({ error, isError });

  const items = useMemo(() => data?.pages.flatMap(page => page.data.items) ?? [], [data]);
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { error, isError, items, totalCount, ...rest };
};
```
`...rest` feeds `List` directly (`fetchNextPage`, `hasNextPage`, `isFetchingNextPage`, `isLoading`, `isRefetching`, `refetch`).

**Mutation**
```ts
export const useSendFriendInvitation = () => {
  const invalidateFriendRequest = useInvalidateFriendsFindMyFriendRequest();
  const invalidateUsersFindAll = useInvalidateUsersFindAll();

  const mutation = useFriendsCreate({
    mutation: {
      onSuccess: (_data, variables) => {
        invalidateFriendRequest(variables?.data?.receiverUid);
        invalidateUsersFindAll();
      },
    },
  });

  const mutateAsync = (receiverUid: string) => mutation.mutateAsync({ data: { receiverUid } });

  return { ...mutation, mutateAsync };
};
```
- Name the variable `mutation`; return `{ ...mutation, mutateAsync }` (+ `mutate` if needed) with a simplified signature hiding the `{ data }`/`{ uid }` envelope. Fixed path params may be hook args (`useBlockUser(userUid)`).
- **Invalidation lives in the hook-level `onSuccess`**, generous (everything the change affects: entity, lists, counts, user-me). Per-call extras (analytics) go in the 2nd arg of `mutateAsync`.
- No `onMutate` optimistic updates; the only cache surgery is chat (`setQueryData` in `chat-room-message-queue/`).

## 3. Invalidation

- Use the generated `useInvalidate*` helpers, instantiated at the top of the hook, called fire-and-forget. Calling a list helper **with no args** prefix-matches all filtered and infinite variants.
- Manual `queryClient` only for chat cache patches and `queryClient.clear()` on logout. Chat message cache keys hard-code `{ limit: 10 }` — keep in sync with `LIMIT_MESSAGES`.

## 4. Errors & mutation call sites

`customInstance` throws a normalized `ErrorResponse` (`api_error_detail`, `api_error_status`, `api_path`…). 401 → shared refresh-token flow in `api.instance.ts` (then logout on failure) — don't reimplement.

Call site pattern (component that triggers the mutation):
```ts
const { t } = useTranslate();
const { toast } = useToast();
const { trackError, trackEvent } = useAnalytics();
const { isPending: isUpdatingUserMe, mutateAsync: updateUserMe } = useUpdateUserMe();

const onSubmit = async (data: ProfilEditNameSchema) => {
  if (data.firstname === userMe?.firstname) {
    router.back();
    return;
  }
  try {
    await updateUserMe(data);
    trackEvent({ data, eventName: ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_NAME_SUCCESS });
    toast({ message: t('profil.profil-edit.name_updated_success'), variant: 'success' });
    router.back();
  } catch (error) {
    const errorResponse = error as ErrorResponse;
    trackError({ error });
    trackEvent({
      data: { error_message: errorResponse?.api_error_detail ?? 'Unknown error' },
      eventName: ANALYTICS_EVENTS.PROFIL.PROFIL_EDIT_NAME_FAILED,
    });
  }
};
```
- `trackError` shows the generic `common.error_generic` toast by default; `showToast: false` for background side effects.
- Specific backend errors: compare `api_error_detail` with `API_ERRORS` (`src/api/utils/api.errors.ts`) and show a specific toast.

## 5. Zustand stores

- Global: `src/stores/<name>.store.ts`. Feature: `features/<f>/stores/<name>.store.ts` (not `store/`).
```ts
interface SessionTeamStore {
  reset: () => void;
  teamUid: string | undefined;
  setTeamUid: (teamUid: string | undefined) => void;
}

export const useSessionTeamStore = create<SessionTeamStore>(set => ({
  reset: () => set({ teamUid: undefined }),
  setTeamUid: teamUid => set({ teamUid }),
  teamUid: undefined,
}));
```
- Actions: `setX`, `reset` (always provide it), plus `add/remove/toggle/update` when needed. Keys alphabetical (lint). Skip no-op updates: `set(state => (state.x === value ? state : { x: value }))`.
- Filter stores: `filters` (generated `…Params` type) + `numberOfFilters` + `setFilters` merging `get().filters` + `reset` + pure `calculateNumberOfFilters`.
- Read with **one selector per field**: `const setFilters = useXStore(state => state.setFilters);` — `useShallow` for multi-field picks; never `const { a, b } = useXStore()`. Outside React: `useXStore.getState()`.
- Persist only when needed: `persist(..., { name: MMKV_STORAGE_KEY.X, partialize, storage: createJSONStorage(() => zustandStorage) })`, key added to `src/constants/mmkv-keys.constants.ts`.
- **Register every new store's `reset()` in `src/utils/reset-caches.utils.ts`** (logout).
- Per-instance state (same screen stacked twice): vanilla `createStore` + provider holding `useState(() => createXStore())` + overloaded `useXStore(selector)` that throws outside the provider — see `features/chat-room/context/chat-room-store-context.tsx`.
- Plain React context only to pass callbacks/`t` to memo'd list rows (`features/players/context/players-list.context.ts`).

## 6. Forms (react-hook-form + zod v4)

- Schema `features/<f>/schemas/<form>.schema.ts`, a **factory taking `t`**:
  ```ts
  export const profilEditNameSchema = (t: TolgeeInstance['t']) =>
    z.object({ firstname: nameSchema(t), lastname: nameSchema(t) });

  export type ProfilEditNameSchema = z.infer<ReturnType<typeof profilEditNameSchema>>;
  ```
  Reuse building blocks from `@/utils/zod-schemas.utils` (`nameSchema`, `emailSchema`, `passwordSchema`, `birthdateSchema`). Zod v4 syntax (`z.email()`, `z.enum(GeneratedEnum)`).
- `useForm<Schema>({ defaultValues, mode: 'onChange', resolver: zodResolver(schema(t)) })`, `<FormInput control={control} name="..." />`, `handleSubmit(onSubmit)` passed to the footer, `isPending` → `isLoading`. Read live values with `useWatch`.
- Multi-step: draft in a flow store; each step syncs `useWatch` values + `isValid` to the store.

## 7. Realtime & push

- Socket: `services/websocket` (singleton) → `useWebsocketConnection` (mounted by `WebsocketInitializer`) → single `'notification'` event dispatched on `WS_TYPES` (`src/types/websocket.type.ts`) to one `hooks/web-sockets/web-sockets-on-notifications-<type>.hook.ts` per type returning `handleX`. New event type = add to `WS_TYPES` + new handler hook + case in the dispatcher; the handler **invalidates** with generated helpers (patch the cache only for chat).
- Push never touches the cache; taps are routed (see ludora-navigation §7).

## 8. Analytics

- `const { trackError, trackEvent, trackIdentity } = useAnalytics();` (`@/hooks/analytics-trackers.hook`).
- Declare events in `src/constants/analytics-events.constants.ts` (`ANALYTICS_EVENTS` nested `as const`, snake_case values, optional typed payload in `AnalyticsEventData`) and use `ANALYTICS_EVENTS.X.Y` — not string literals.
- Every user-triggered mutation: `_success` event on success, `trackError` + `_failed` event in catch.
- Non-React code: `posthog` from `@/services/posthog.service`.

## 9. Auth

Tokens only in `expo-secure-store` (`access_token`, `refresh_token`). Login/logout only through `useAuthHelpers()` (`login(tokens)` / `logout()` — handles store, caches, device unregister, Google sign-out). Route guards read `useAuthStore`.
