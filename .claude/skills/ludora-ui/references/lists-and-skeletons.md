# Lists and skeletons

How the `List` wrapper builds its data, and four real screens (simple, sticky header, sticky + top header, item-dependent size) with their item and skeleton components. Source of truth: `src/components/ludo-ui/components/list/list.component.tsx`.

## What `List` injects (`list.component.tsx:17-92`)

`List` feeds LegendList a synthetic array, in this order:
1. `{ type: 'sticky' }` if `ListStickyComponent` is set, then `{ type: 'header_top' }` if `ListTopComponent` is set.
2. Then exactly one of: 3 `{ type: 'skeleton' }` items (`isLoading && !isRefetching && SkeletonComponent`), one `{ type: 'loading' }` item (spinner, when loading without a skeleton), one `{ type: 'empty' }` item (`EmptyResult` with `emptyResultProps`), or your `data`.

`getItemType` returns `item.type` for those objects and for any data item that has its own `type` field; otherwise `'row'` (`:111-116`). `getFixedItemSize(item, index, type)` is therefore called for sticky, header_top, skeleton, loading, empty and row items. In every list below, skeletons, empty and loading fall through to the row height, so the skeleton must be drawn at the row height.

Other built-ins: sticky index is `[0]` (`:98-103`), `onEndReached` guards `!isLoading && !isFetchingNextPage && hasNextPage` (`:105-109`), the footer shows 3 more skeletons while `isFetchingNextPage` (`list-footer.component.tsx:14-31`), `keyExtractor` uses `item.uid`, so data items need a `uid` (`:145-150`). `hasRefreshControl` + `refetch` enable pull-to-refresh (`:219-228`).

## 1. Simple list: blocked users

`features/settings/components/settings-blocked-users/settings-blocked-users-list.component.tsx`

```tsx
const LIST_ITEM_SIZE_HEIGHT = 95;
const GET_FIXED_ITEM_SIZE = () => LIST_ITEM_SIZE_HEIGHT;
const NOOP_FETCH_NEXT_PAGE = () => {};
```
(`:12-14`). One height for everything. Not paginated, so `fetchNextPage={NOOP_FETCH_NEXT_PAGE}`, `isFetchingNextPage={false}`, `hasNextPage={false}` (`:31-33`). The header (`SettingsBlockedUsersHeader` -> `SettingsHeader` -> `HeaderOutlined`, `className="mb-4"`) is the `ListHeaderComponent`, rendered over the content with:

```tsx
hasHeaderTransparent
hasTopSafeArea
listHeaderComponentHeight={HEADER_OUTLINED_HEIGHT}
```
(`:43-45`; `HEADER_OUTLINED_HEIGHT = 50` from `header-outlined.component.tsx:23`). `hasHeaderTransparent` pulls the header up by `listHeaderComponentHeight` (`list.component.tsx:176-181`) and `contentContainerStyle` adds the same top margin (`:240-244`). Empty state: `EMPTY_RESULT_PROPS` typed `EmptyResultProps` with `hasRandomTitle: true, iconNames: ['ludo-eating-pizza'], randomOptions: 3, title: 'settings.blocked_users.empty_list_v'` (`:16-21`).

- Item (`.../settings-blocked-users-list-item/settings-blocked-users-list-item.component.tsx:16`): `memo` + `{ item }`; `BoxRowCenterBetween className="border-primary bg-primary/10 gap-3 rounded-2xl border px-4 py-3"` with an `Avatar` and a `Button size='sm'` inside a `DialogConfirm`.
- Skeleton (`...-list-item-skeleton.component.tsx:4-14`): same outer classes, then `Skeleton variant="circle" className='size-14'`, `Skeleton variant="text" size="sm" className='w-32'`, `Skeleton variant='rectangle' className='w-20 h-9'`. Rule: copy the item's container classes verbatim, replace each leaf by a `Skeleton` with an explicit size class.

## 2. Sticky header: my fields

`features/my-fields/components/my-fields-list/my-fields-list.component.tsx`

```tsx
const LIST_ITEM_SIZE_HEIGHT = 185;
const LIST_STICKY_COMPONENT_HEIGHT = 75;
// ...
const handleFixedItemsSize = useMemo<GetListFixedItemSize>(
  () => (_item, _index, type) => {
    if (type === 'sticky') {
      return LIST_STICKY_COMPONENT_HEIGHT;
    }
    return LIST_ITEM_SIZE_HEIGHT;
  },
  [],
);
```
(`:18-36`). Header and sticky element are `useMemo(() => <X />, [])` (`:49-53`) and passed as `ListHeaderComponent` / `ListStickyComponent`. Bottom padding is computed from `useSafeArea().bottom`, plus `HEADER_OUTLINED_HEIGHT` on Android (`:42-47`), and passed as `contentContainerStyle`. Extra scroll handling (`onScroll`, `scrollEventThrottle={16}`) drives a FAB (`:77-78`).

- Sticky: `MyFieldsHeaderSticky` (`my-fields-header-sticky.component.tsx:25`) = `Box className='py-2 bg-background'` around a `SegmentedControl`. The sticky element needs an opaque background, otherwise rows show through when it sticks.
- Item: `MyFieldCard` (`my-field-card.component.tsx:50`) = shared `FieldCard` + `Chip` child.
- Skeleton: the shared `FieldCardSkeleton` (`SkeletonComponent={FieldCardSkeleton}`, `:76`), mirroring `FieldCard` (top banner `h-16`, then bordered body; `field-card-skeleton.component.tsx:13-41`).

## 3. Sticky + top header: home sessions

`features/home/components/home-session-list/home-session-list.component.tsx`

```tsx
const FIXED_LIST_ITEM_SIZE = 170;
const FIXED_LIST_STICKY_COMPONENT_SIZE = 66.33;
const FIXED_LIST_TOP_COMPONENT_SIZE = 132.66;
```
(`:14-16`), with `getFixedItemSize` branching on `'sticky'` then `'header_top'`, else the row size (`:48-59`). Three header slots are used together (`:71-77`, `:94-98`):
- `ListHeaderComponent` (`HomeSessionListHeaderTopList`, `HeaderScreen` big title; its height is passed as `listHeaderComponentHeight`, `176` or `210` with an incoming session, `:18-19`, `:99`),
- `ListTopComponent` (`HomeSessionListHeader`, with `DaysCarousel`, scrolls away),
- `ListStickyComponent` (`HomeSessionListHeaderSticky`, `FiltersHeader` on `bg-background py-3`, `home-session-list-header-sticky.component.tsx:30`).
`hasListStickyComponentTopSafeArea` pushes the sticky bar below the status bar. Android bottom padding adds the sticky and top heights (`:61-69`), and an extra `BOTTOM_PADDING_EMPTY_LIST = 100` when there are no sessions.

- Item/skeleton: shared `SessionCard` / `SessionCardSkeleton`. The skeleton mirrors the card: optional `h-16` banner, then `BoxRow` with a left `bg-[#F5F5F5] p-4` block, a center `BoxGrow`, and text skeletons (`session-card-skeleton.component.tsx:11-46`). `isNextSession` switches off the banner in both.
- Empty: `EMPTY_RESULT_PROPS = { className: 'mt-4', hasRandomTitle: true, randomOptions: 5, title: 'home.sessions_empty_result_v' } as const` (`:23-28`); `EmptyResult` resolves `` `${title}_${n}` `` (`empty-result.component.tsx:54-59`), so keys end `_v_1.._v_5`.

## 4. Size depends on the item: fields lists

`features/create-session/components/create-session-steps/create-session-step-2/create-session-step-2-fields-list/create-session-step-2-fields-list.component.tsx:44-59`:

```tsx
const fixedItemsSize = useMemo<GetListFixedItemSize<FieldResponseDto>>(
  () => (item, _index, type) => {
    if (type === 'sticky') {
      return LIST_STICKY_COMPONENT_HEIGHT;
    }
    if (type === 'header_top') {
      return LIST_TOP_COMPONENT_HEIGHT;
    }
    if (item.type === FieldResponseDtoType.PRIVATE) {
      return LIST_PRIVATE_FIELD_ITEM_HEIGHT;
    }

    return LIST_PUBLIC_FIELD_ITEM_HEIGHT;
  },
  [],
);
```
Constants: `95`, `59.33`, `227` (public), `241` (private) (`:18-21`). Pass the item generic (`GetListFixedItemSize<FieldResponseDto>`) to type `item`. Because `FieldResponseDto` has its own `type` field, `getItemType` forwards it (`list.types.ts:13-15`), so the `type` argument is `'PUBLIC'`/`'PRIVATE'` for rows: branch on `item.type`, not on `type`. Skeleton: `CreateSessionStep2FieldCardSkeleton` = `<FieldCardSkeleton showSlots />` (`...create-session-step-2-field-card-skeleton.tsx:6`).

## Conventions checked across the repo

- Sizes are hand-measured module constants (`LIST_ITEM_SIZE_HEIGHT`, `*_COMPONENT_HEIGHT`); fractional values such as `66.33` appear. Nothing computes them.
- A constant size can be `const GET_FIXED_ITEM_SIZE = () => 95;`; mixed sizes use `useMemo<GetListFixedItemSize>` or a module-level typed const (`invite-friends-list.component.tsx:12-13`).
- `emptyResultProps` is a module const (stable reference), `as const` or typed `EmptyResultProps`.
- Skeleton and item files are siblings, `memo`-wrapped, no props.

## Known inconsistencies (do not copy)

- `PlayersList` still uses `estimatedItemSize={ESTIMATED_ITEM_SIZE}` (`features/players/components/players-list/players-list.component.tsx:79`) and imports `List` from `@/components/ludo-ui` (`:4`); the SKILL.md `PlayersList` snippet shows the `getFixedItemSize` target form, not that file.
- `SettingsFriendsList` passes no `SkeletonComponent` (`settings-friends-list.component.tsx:20-38`), so it shows the spinner row while loading.
- `InviteFriendsList` passes component references (`ListHeaderComponent={InviteFriendsHeader}`, `ListStickyComponent={InviteFriendsHeaderInput}`, `invite-friends-list.component.tsx:36-37`) instead of `useMemo` elements; both forms are accepted (`renderComponent`, `list/utils/index.tsx:1-7`).
- `settings-blocked-users-list-item*.tsx` omit semicolons and use unscoped Tolgee keys (`t("settings_unblock_user")`, `:49-54`); follow the semicolon style and namespaced keys.
