# ROUTES constants and route params in practice

How `ROUTES`, `RootStackParamList` and `ReturnStackParamList` line up in real code, with three traced end-to-end flows.
Read it when you add a route that takes params, return a value to a caller, or wonder why a param key does not look like the route file.

## The three files and what the keys really are

- `src/constants/routes.constants.ts`: `ROUTES` (`as const`) plus `RouteValues = Flatten<typeof ROUTES>` (`:114`).
- `src/types/routes-params.types.ts`: `RootStackParamList` (`:4`, params the screen receives) and `ReturnStackParamList` (`:91`, params a sheet sends back).
- `src/features/<f>/types/<f>.types.ts`: one alias per screen, `RootStackParamList[typeof ROUTES.X.Y]`.

The param-list key is only a **type lookup key**. It is whatever `ROUTES` constant you index with, not necessarily the file pattern:

| Param key | Value | Real file pattern |
|---|---|---|
| `ROUTES.SESSION.INDEX` | `'/session'` (`routes.constants.ts:89`) | `session/[id]/index.tsx` |
| `ROUTES.INVITE_FRIENDS.INDEX` | `'/invite-friends'` (`:51`) | `invite-friends/[sessionId]/index.ts` |
| `ROUTES.SESSION.JOINED` | `'/session/[id]/session-joined'` (`:91`) | `session/[id]/session-joined.ts` |
| `ROUTES.FILTERS.FILTER` | `'/filters'` (`:40`) | `filters/index.ts` |

So: when the area root has a dynamic child, `INDEX` is the bare area and `INDEX_UID(uid)` builds the real URL. Always pair the key you index with the builder you navigate with, and keep the param **name** equal to the `[folder]` name (`id`, `sessionId`, `chatRoomId`).

## Example 1: plain dynamic id (session detail)

1. Route file `src/app/(root)/session/[id]/index.tsx` re-exports `SessionScreen`.
2. `ROUTES.SESSION.INDEX: '/session'` and `INDEX_UID: (uid: string) => '/session/' + uid`-style builder (`routes.constants.ts:89-90`, a template literal in the source).
3. Param type (`routes-params.types.ts:33-35`):
   ```ts
   [ROUTES.SESSION.INDEX]: {
     id: string;
   };
   ```
4. Feature alias (`features/session/types/session.types.ts:4`):
   ```ts
   export type SessionScreenLocalSearchParams = RootStackParamList[typeof ROUTES.SESSION.INDEX];
   ```
5. Navigate (`features/notifications/components/notifications-list-items/notification-list-items-session-invitation.component.tsx:33`):
   ```ts
   router.navigate(ROUTES.SESSION.INDEX_UID(sessionUid));
   ```
6. Read (`features/session/screens/session.screen.tsx:35`):
   ```ts
   const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
   ```
   Same alias is reused by `session-footer.component.tsx:34` and `session-section-teams-header.component.tsx:21`. Missing data then goes to `<Redirect href={ROUTES.NOT_FOUND.INDEX} />` (`session.screen.tsx:49-51`).

## Example 2: path builder + query params + serialize/parse (join session -> chat room)

1. Route files `session/[id]/session-joined.ts` and `chat-room/[chatRoomId]/index.ts`.
2. Constants: `SESSION.JOINED` pattern and `JOINED_UID` builder (`routes.constants.ts:91-92`), `CHAT_ROOM.INDEX_UID` (`:17`).
3. Param types: `[ROUTES.SESSION.JOINED]` (`routes-params.types.ts:64-70`) with `sessionData: string`, and `[ROUTES.CHAT_ROOM.INDEX]` (`:36-45`) with every field optional plus `sessionData?: string`. Path params and extra query params live in the same object.
4. Alias: `SessionJoinedLocalParams` (`session.types.ts:6`). The chat-room alias in `session-joined.screen.tsx:12` is declared locally.
5. Navigate with an object serialized to a string (`features/session/components/session-footer.component.tsx:88-100`):
   ```ts
   const params: SessionJoinedLocalParams = {
     conversationUid,
     imageUrl: fieldImages?.[0]?.url,
     name: title,
     sessionData: serialize({
       sessionUid: sessionUidResponse,
       sport: session.sport,
       teamLabel: sideTeam === 'left' ? 'A' : 'B',
       teamName: title,
     }),
     type: ConversationCollectionResponseDataType.SESSION,
   };
   router.replace({ params, pathname: ROUTES.SESSION.JOINED_UID(sessionUidResponse || '') });
   ```
   `replace`, not `navigate`: the join screen must not stay under the success screen.
6. Forward untouched (`session-joined.screen.tsx:17-29`): the screen reads `sessionData` and passes the same string to `router.replace({ params, pathname: ROUTES.CHAT_ROOM.INDEX_UID(conversationUid) })`.
7. Parse defensively (`features/chat-room/components/chat-room-initializers/chat-room-info-initializer.component.tsx:24,34-41`):
   ```ts
   const sessionData = params.sessionData !== 'undefined' ? params.sessionData : undefined;
   const chatRoomSessionData: SessionData | null = useMemo(() => {
     if (!sessionData || !isString(sessionData)) return null;
     try {
       return parse(sessionData);
     } catch {
       return null;
     }
   }, [sessionData]);
   ```
   The `'undefined'` string guard exists because an optional param serialized from `undefined` arrives as the text `'undefined'` (lines 19-24 do it for every optional param). When the params are incomplete the initializer falls back to fetching the chat room (`:49-54`).

## Example 3: return-param flow (filters sheet back to its caller)

Caller sends `goBackPath`, the sheet answers with `dismissTo`, the caller reads then clears.

1. Route files `filters/index.ts` (+ `filters-addresses.ts`, `filters-calendar.ts`).
2. Constant `ROUTES.FILTERS.FILTER: '/filters'` (`routes.constants.ts:40`).
3. Types: out (`routes-params.types.ts:20-24`) `{ goBackPath: RouteValues; source?: ...; selectedDayCarouselDate: string }`; back (`:92-94`) `{ selectedFilters: string }`. Aliases (`features/filters/filters/types/filters.types.ts:4,6`): `FiltersScreenParams`, `FiltersReturnParams`.
4. Navigate (`components/ui/filters-header/components/filters-header.component.tsx:59-64`):
   ```ts
   const params: FiltersScreenParams = {
     goBackPath,
     selectedDayCarouselDate: selectedDayCarouselDate ?? '',
     source,
   };
   router.navigate({ params, pathname: ROUTES.FILTERS.FILTER });
   ```
   `goBackPath` defaults to `ROUTES.CREATE_SESSION.INDEX` (`:26`); callers pass their own, see below.
5. Sheet persists it (`features/filters/filters/components/filter-footer.component.tsx:31-36`) into MMKV (`mmkvStorage.setItem(...)`) and falls back to it when the param is missing (`goBackPath ?? mmkvStorage.getString(...)`, `:43`), then on apply (`:42-54`):
   ```ts
   const params: FiltersReturnParams = {
     selectedFilters: serialize(filters),
   };
   router.dismissTo({ params, pathname: backPatchValue });
   ```
6. Caller parses and reacts (`filters-header.component.tsx:35-51`): `useLocalSearchParams<FiltersReturnParams>()`, `parse(selectedFilters)` in a `try/catch` `useMemo`, then `onFiltersChange(parsed)` in an effect.
7. Clearing consumed params: the address sub-sheet returns `{ address: serialize(place) }` (`features/filters/filters-addresses/components/filter-addresses-list.component.tsx:81-82`); the receiver applies it then clears (`features/filters/filters/components/filter-location/filter-location.component.tsx:45-50`):
   ```ts
   setFilters({ address: incomingAddress, nearby: undefined });
   router.setParams({ address: undefined });
   ```
   Nested hop: filters opens addresses with `{ goBackPath: ROUTES.FILTERS.FILTER }` (`filter-location.component.tsx:60-64`), so the chain is caller -> filters -> addresses -> back to filters.

Second return flow with the same shape: `image-picker` (`routes-params.types.ts:61-63` out, `:102-104` back with `images: string`), sent at `features/image-picker/screens/image-picker.screen.tsx:26-33` and read at `features/profil/components/profil-edit/profil-edit-avatar.component.tsx:33-42`.

## Inconsistencies seen (do not copy)

- `goBackPath` is typed `RouteValues` but several callers pass string literals: `'/profil/profil-edit'` (`profil-edit-avatar.component.tsx:76`, which also navigates to the literal `'/image-picker'` at `:81`), `"/create-session/step-2"`, `"/(tabs)/players"`, `"/"`. Prefer `ROUTES.*`.
- `RootStackParamList[typeof ROUTES.INVITE_FRIENDS.INDEX]` is inlined at `invite-friends-footer.component.tsx:20` and `get-user-friends-by-filter.query.ts:14` instead of using a feature alias.
- `session-joined.screen.tsx:31` builds the share URL with `ROUTES.SESSION.INDEX_UID(conversationUid)`: a conversation uid, not a session uid (looks like a bug; the params carry `sessionUid` inside `sessionData`).
- `SKILL.md` section 3 shows an `InviteFriendsParams` / `goBackPath` snippet for invite-friends; the real call sites are `router.navigate(ROUTES.INVITE_FRIENDS.INDEX_UID(uid))` with no extra params (e.g. `create-session-footer-buttons-created-session.component.tsx:18`).
- `SKILL.md` "Known broken" says `SESSION.JOINED_UID` lacks a leading slash; at `routes.constants.ts:92` it has one.
