---
name: ludora-ui
description: Use when writing or editing any React Native component, screen body, list, form sheet, dialog, toast, header, skeleton, empty state, icon, image or animation in the Ludora mobile app. Defines how @ludo/ui vs @chillui/ui are used, Uniwind/Tailwind styling tokens, the List (LegendList) API with getFixedItemSize, loading/empty/error patterns, component splitting and Tolgee translation usage. Load with ludora-code-style.
---

# Ludora UI components

Before writing, open one sibling component in the same feature and one shared equivalent in `src/components/ui/` — reuse beats new.

## 1. Imports: @ludo/ui first

`@ludo/ui` (`src/components/ludo-ui`) is a thin app layer over `@chillui/ui` (`src/components/chill-ui-library`). **Features import primitives from `@ludo/ui`.** Import from `@chillui/ui` only what ludo-ui doesn't wrap: `cn`, `useToast`, `ScalePressable`, `OutlinedString`, `LoadingIndicator`, `Pellet`, `BounceBox`, `Dialog*`, `Carousel*`, `SegmentedControl*`, types `StrictOmit`, `WrapperProps`. Never import via `@/components/ludo-ui` / `@/components/chill-ui-library` paths, and never edit chill-ui internals for a feature need.

Main `@ludo/ui` components:

| Component | Key props |
|---|---|
| `Box`, `BoxRow`, `BoxCenter`, `BoxRowCenterBetween`, `BoxGrow`, `BoxColumn`, `BoxAbsolute`… | `className` |
| `String` (never RN `Text`) | `variant` `body-xs`(12) `body-sm`(14) `body-1`(16, default) `body-2`(18) `body-3`(20) `title-1…8`; `size` xs…9xl (fallback when no variant fits; never `text-[Npx]`); `font` `primaryRegular/Medium/SemiBold/Bold/ExtraBold/Light/Italic` (Figtree, default `primaryMedium`) or `secondaryBold/ExtraBold…` (Baloo 2, default for `title-*`; `title-3`+ already carry a Baloo-safe line height (chill `String.styles.ts`), don't add `leading-*`); `colorVariant` (dark default, muted, primary, secondary, white, danger, success…); `position`; `truncate`; `redirect` |
| `Button` | `title`, `onPress`, `isLoading`, `size` 2xs…2xl (lg default), `variant` contained/outlined/text, `colorVariant`, `iconProps={{ name, position }}`, `redirect` |
| `IconButton` | `iconName`, `iconColor`, `size`, `variant`, `colorVariant`, `isLoading` |
| `Icon` | `name` (from generated `icons.constants`, `-solid`/`-regular`), `size`, `color`, `className` |
| `Avatar` | `data={{ firstname, lastname, imageUrl }}`, `size`, `colorVariant` primary/secondary |
| `Skeleton` | `variant` text/square/circle/rectangle, `className` for size |
| `Wrapper` | `px` (md=16 default), `fill` (default true only on the scroll/safe-area/keyboard variants; plain `Wrapper` has no default), `grow`; plus `WrapperKeyboardAwareScrollView`, `WrapperSafeAreaView`… |
| `ScreenLayout` | wraps every screen (background image) |
| `ScrollView` | `contentContainerClassName`, `hasRefreshControl` + `refetch` + `isRefetching`, `bounces` |
| `List` | see §4 |
| `Image` / `ImageBackground` | expo-image with `className`, `contentFit` |
| `FormInput`, `FormDatePickerInput` | react-hook-form `control`, `name`, `label`, `placeholder` (translates errors itself) |
| `Separator`, `Badge`, `Toggle`, `NumericInput`, `Link`, `BlurView`, `Chip`, `Accordion*` | |

## 2. Styling

- **Uniwind/Tailwind `className` by default.** Theme tokens in `src/global.css` `@theme` (Ludora design system): `primary` orange #f15924 (+ `primaryDark`, `primarySoft`), `secondary` brick red #ce3728 (main action, + `secondarySoft`), `tertiary` sun yellow #fcbd1d (+ `tertiaryHalo`, `tertiarySoft`), `dark` anthracite #333132 (+ `darkSoft`), `background` cream #fff8ec, `border`, `input`, `muted`, `placeholder`, `error`, `success`… No purple, no dark mode. Fonts: `font-primary-*` (Figtree, UI) and `font-secondary-*` (Baloo 2, titles).
- **No arbitrary values when a Tailwind class exists** (the IDE flags them):
  - spacing and sizes use the 4px scale, fractions included: `size-52.5` not `size-[210px]`, `pb-7.5` not `pb-[30px]`, `py-1.25` not `py-[5px]`, `leading-11` not `leading-[44px]`.
  - radii use the design system tokens: `rounded-badge` 10, `rounded-control` 12, `rounded-button-sm` 14, `rounded-field` 16, `rounded-button` 18, `rounded-card` 22, `rounded-sheet` 30, `rounded-header` 34 (also `rounded-t-*` / `rounded-b-*`). `cn` knows them, so a `className` override still wins.
  - **text size on `String`: never `text-[15.5px]`.** Order of preference: 1) `variant` (`body-xs` 12, `body-sm` 14, `body-1` 16, `body-2` 18, `body-3` 20, `title-1` 24, `title-2` 30, `title-3` 36, `title-4` 48…), 2) `size` (`xs` 12, `sm` 14, `md` 16, `lg` 18, `xl` 20, `2xl` 24, `3xl` 30, `4xl` 36…), both of which set the matching line height. If the design size has neither (e.g. 15.5, 38), **ask the user** which variant/size to round to instead of writing an arbitrary class. ESLint warns on `text-[<n>…]` in className.
  - Exception: `tv()` styles (tailwind-variants has its own merge, e.g. chill Button) keep `rounded-[18px]`-style radii.
- Recurring recipes:
  - content sheet over the background: `bg-background rounded-t-sheet`
  - card: `bg-white rounded-card border border-border overflow-hidden`
  - colored header: `bg-tertiary rounded-b-header`
  - spacing with `gap-*` (not margins), `px-4`, `size-*`, opacity colors `border-primary/20`
- Conditional classes: `cn('items-center gap-4', { 'mt-10': !center }, className)` — always accept and forward a `className` prop last on reusable components.
- `style` only for: shadows (module `StyleSheet.create({ shadow: { boxShadow: '0px 2px 8px rgba(0,0,0,0.08)' } })`), safe-area paddings, measured/dynamic sizes, reanimated styles.
- JS color values (Icon `color`, loaders, RefreshControl): `COLORS.primary` from `@/constants/colors.contstants`.
- Variant-heavy local styles: `tv()` from tailwind-variants in a sibling `<name>.styles.ts`.
- Safe areas: **only** `useSafeArea()` (`@/hooks/safe-area.hook`) → `{ top, safeTop, bottom, bottomTab, insetsBottom }`. Never `useSafeAreaInsets` directly. Headers/footers take `hasTopSafeArea` / `hasBottomSafeArea`.

## 3. Component anatomy

```tsx
import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Box, BoxRow, Button, String } from '@ludo/ui';

type SessionSummaryCardProps = {
  className?: string;
  isLoading?: boolean;
  onPressJoin: () => void;
  title: string;
};

export const SessionSummaryCard = (props: SessionSummaryCardProps) => {
  const { className, isLoading = false, onPressJoin, title } = props;
  const { t } = useTranslate();

  return (
    <Box className={cn('gap-3 rounded-card bg-white p-4', className)}>
      <String font="primaryBold" variant="body-2" truncate>
        {title}
      </String>
      <BoxRow className="justify-end">
        <Button title={t('session.join_button_title')} size="sm" isLoading={isLoading} onPress={onPressJoin} />
      </BoxRow>
    </Box>
  );
};
```

- One component per file; median ~40 lines. Split aggressively into sub-files in a folder named after the parent (`players-list/players-list-item/players-list-item-invite.component.tsx`). Recurring suffixes: `-item`, `-item-skeleton`, `-header-sticky`, `-header-top-list`, `-footer`, `-wrapper`, `-trigger`.
- `PropsWithChildren<XProps>` for children.
- **Components own their data**: the screen fetches only its main entity (for loading / not-found gating, see ludora-navigation §5); a list component calls its own query hook; a header reads its store with selectors; the leaf that triggers a mutation calls it (try/catch + toast + analytics). Screens stay thin. Extract a custom hook only for reused/complex logic (`features/<f>/hooks/`).
- Shared UI goes in `src/components/ui/<name>/components/*.component.tsx` + `index.ts` (`export { SessionCard } from './components/session-card.component';`). Check there first: `SessionCard`, `FieldCard`, `EmptyResult`, `ComingSoon`, `Loading`, `DialogConfirm`, `FormSheet*`, `FooterWrapper`, `HeaderOutlined`, `SegmentedControl`, `ShareButton`, `QuickActionCard`, `Calendar`, `DaysCarousel`…

## 4. Lists — always `List` from `@ludo/ui`

LegendList wrapper. Feed it straight from an infinite-query wrapper (`items` + `...rest`):

```tsx
const ITEM_HEIGHT = 81;
const GET_FIXED_ITEM_SIZE: GetListFixedItemSize = (_item, _index, type) => (type === 'sticky' ? 66 : ITEM_HEIGHT);
const EMPTY_RESULT_PROPS = { hasRandomTitle: true, title: 'players.no_result_title' } as const;

export const PlayersList = () => {
  const { bottomTab } = useSafeArea();
  const { fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isRefetching, items, refetch } =
    useGetUsersSuggestionByFilter();
  const contentContainerStyle = useMemo(() => ({ paddingBottom: bottomTab }), [bottomTab]);

  return (
    <List
      data={items}
      ItemComponent={PlayersListItem}
      SkeletonComponent={PlayersListItemSkeleton}
      emptyResultProps={EMPTY_RESULT_PROPS}
      getFixedItemSize={GET_FIXED_ITEM_SIZE}
      isLoading={isLoading}
      isFetchingNextPage={isFetchingNextPage}
      isRefetching={isRefetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      refetch={refetch}
      hasRefreshControl
      contentContainerClassName="rounded-t-sheet bg-background px-4"
      contentContainerStyle={contentContainerStyle}
    />
  );
};
```

- **Use `getFixedItemSize`** (`GetListFixedItemSize` from `@ludo/ui` types; `type` ∈ `sticky | header_top | skeleton | empty | loading | row`) as a module const or `useMemo`. Not `estimatedItemSize`.
- Headers go inside the list: `ListHeaderComponent` / `ListTopComponent` / `ListStickyComponent` (built with `useMemo(() => <X />, [])`).
- Items: `const XComponent = ({ item }: XProps) => {...};` + `export const X = memo(XComponent);`. Shared row callbacks go through a small feature context (`features/players/context/players-list.context.ts`), not props.
- Plain RN `FlatList` only for small non-paginated nested lists.

## 5. States

- **Screen loading:** `if (isLoading) return <Loading />;` (`@/components/ui/loading`).
- **Section loading:** sibling `<x>-skeleton.component.tsx` mirroring the layout with `Skeleton`, then `isLoading ? <XSkeleton /> : <X />`.
- **Not found:** `return <Redirect href={ROUTES.NOT_FOUND.INDEX} />;`.
- **Empty:** `EmptyResult` (`@/components/ui/empty-resulat` — typo is real) with `title` as a translation **key**, optional `hasRandomTitle`. Unbuilt feature: `ComingSoon`.
- **Errors:** no error components; handle in the handler (see ludora-data §4): `trackError` shows the generic toast.

## 6. Overlays & feedback

- **Toast:** `const { toast } = useToast();` (`@chillui/ui`) → `toast({ message: t('profil.block_user_success_message', { name }), variant: 'success' })`. Variants success/error/info/warning.
- **Confirm dialog:** `DialogConfirm` wrapping the trigger as children: `title`, `content`, `source` (analytics), `confirmButtonTitleKey`, `onConfirmPromise`, `isLoading`, `priority`, optional `open`/`onOpenChange`.
- **Form sheet screen** (`features/<f>/formsheets/<name>.formsheet.tsx`, routed — see ludora-navigation):
  ```tsx
  <>
    <FormSheetHeader title={t('profil.profil-edit.name_title')} />
    <Wrapper fill={false} className="gap-2 pt-5 pb-20">
      <FormInput control={control} name="firstname" label={t('...')} />
    </Wrapper>
    <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
  </>
  ```
  Footer built on `FormSheetFooter` (`hasBottomSafeArea={IS_ANDROID}`; primary Button + outlined cancel). Multi-view sheets: `useState<'actions' | 'report-reasons'>`.
- Screen footers: `FooterWrapper`. Sheet/flow footers: `FormSheetFooter`.
- **Headers:** navigation header is always hidden; screens render their own. New screens use **`HeaderOutlined`** (`@/components/ui/navigation/header-outlined`, `titleKey`, `rightContent`, `hasTopSafeArea`, `hasHorizontalPadding`), wrapped in a small feature `<Feature>Header` component. Sheets: `FormSheetHeader`. Flows (auth/on-boarding): `Header` / `HeaderProgressStepper`.

## 7. Icons, images, pressables, animation

- Icons: `<Icon name="calendar-regular" />`. New SVG → `tools/svg-2-obj/svg/` → `bun generate:icons`. Type icon-name props as `TIconsAll`. Mascots are icons (`ludo-cry`, `mascotte-ludora`) sized via `className="size-36"`.
- Images: `Image` from `@ludo/ui`; sport images via `getSportImage(sport)` (`@/utils/sports.utils`); static assets from `assets`.
- Pressables: RN `Pressable` with `className` for rows/cards; `ScalePressable` (`@chillui/ui`) for tactile tiles/chips; `Button`/`IconButton` already animate. Navigation cards: `<Link href={ROUTES...} asChild>` or `router.navigate`. No `TouchableOpacity`.
- Animations (Reanimated 4): `entering={FadeIn}` for mount; `useSharedValue` + `withSpring`/`withTiming` + `useAnimatedStyle` for value-driven; scroll-driven logic in a hook that returns `animatedStyle`.
- Haptics: `useHaptics().triggerHaptic('light')` — sparingly.

## 8. Translations (Tolgee)

- `const { t } = useTranslate();` (`@tolgee/react`); no `<T>` component.
- Keys `<feature-namespace>.<snake_case_leaf>`, reuse the feature's **existing** namespace (grep `locales/fr.json`): `common.button_cancel`, `profil.profil-edit.name_updated_success`. Leaf suffixes: `_title`, `_label`, `_placeholder`, `_success_message`, `_button_title`. ICU params `t('key', { name })`; dynamic keys `t(\`common.user_level_${level}\`)`.
- Reusable components that translate internally take a key prop: `titleKey`, `labelKey`, `confirmButtonTitleKey`. Otherwise pass `t(...)` results.
- Call `t('key')` with **no default text** (the author does this in ~98% of calls). `locales/*.json` are generated from Tolgee — never hand-edit them. At the end, list every new key with a suggested FR and EN text for the user to create in Tolgee.
- No hard-coded user-facing strings.

## References

- `references/shared-components-catalog.md`: read before building any card, header, footer, empty/loading state, picker or segmented control, to check what already exists in `src/components/ui/` (real props + usage site).
- `references/ludo-ui-api.md`: read when you need exact prop types (`Button`, `String`, `List`, `Wrapper`, `Skeleton`), or to know whether a primitive comes from `@ludo/ui` or must be imported from `@chillui/ui`.
- `references/lists-and-skeletons.md`: read when writing or changing a `List` screen, its `getFixedItemSize`, header/sticky slots, item or skeleton component.
- `references/formsheets-and-dialogs.md`: read when writing a form sheet (single or multi-view), its header/footer, a `DialogConfirm`, or a toast.
