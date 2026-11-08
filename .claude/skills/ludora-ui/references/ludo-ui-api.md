# @ludo/ui API reference

What `@ludo/ui` really exports (`src/components/ludo-ui`), the exact prop types of the five most used components, and which `@chillui/ui` primitives are not wrapped. Aliases: `@ludo/ui` -> `src/components/ludo-ui`, `@chillui/ui` -> `src/components/chill-ui-library` (`tsconfig.json:7-8`).

## Exports

`ludo-ui/components/index.ts` re-exports: `form` (`FormInput`, `FormDatePickerInput`), `button`, `string`, `link`, `icon` (`Icon`), `icon-button`, `image` (`Image`, `ImageBackground`), `screen-layout`, `box`, `skeleton`, `wrapper`, `separator`, `chip`, `input` (`Input`), `badge`, `toggle`, `list`, `avatar`, `accordion`, `numeric-input`, `scroll-view`, `blur-view`. `ludo-ui/types/index.ts` re-exports the prop types (`ButtonProps`, `StringProps`, `ListProps`, `GetListFixedItemSize`, `SkeletonProps`, `FormInputProps`, `IconProps`, `AvatarProps`, `ChipProps`...).

Three kinds of export:
- **Pure re-exports of chill-ui**: all `Box*` (`components/box/index.ts`: `Box`, `BoxAbsolute`, `BoxCenter`, `BoxRowCenter`, `BoxColumnCenter`, `BoxColumnCenterBetween`, `BoxGrow`, `BoxColumn`, `BoxColumnGrow`, `BoxRow`, `BoxRowBetween`, `BoxRowCenterBetween`, `BoxRowGrow`, `BoxStack`), `Wrapper`, `WrapperScrollView`, `WrapperKeyboardAvoidingView`, `WrapperKeyboardAvoidingStickyView`, `WrapperGestureHandlerScrollView` (`components/wrapper/index.ts:1-7`), and the whole accordion (`components/accordion/index.ts`).
- **Thin wrappers** that add app behavior: `Button` (`redirect`, `image`, rounded-full, scale-pressable), `String` (`redirect`, `truncate`, default `colorVariant="black"`), `Skeleton` (`bg-black/20`), `Toggle` (primary track color), `WrapperKeyboardAwareScrollView`, `ScrollView` (refresh control), `Link`, `Image`, `FormInput`.
- **App-only**: `List`, `ScreenLayout`, `BlurView`.

## Not wrapped: import from `@chillui/ui`

Verified in `chill-ui-library/components/*/index.ts` and absent from the ludo-ui exports above:
- `ScalePressable`, `RipplePressable`, `RipplePressableGestureHandler`
- `LoadingIndicator` (plus `Bounce`, `Chase`, `CircleFade`, `Flow`, `Fold`, `Grid`, `Pulse`, `Swing`, `Spinner`)
- `OutlinedString`, `Pellet`, `BounceBox`
- `Dialog`, `DialogClose`, `DialogContent`, `DialogFooter`, `DialogHeader`, `DialogTitle`, `DialogToaster`, `DialogTrigger`
- `Carousel`, `CarouselItem`, `CarouselElement`, `CarouselNext`, `CarouselPrevious`, `CarouselContent`, `CarouselDots`
- `SegmentedControl*` (the app wraps it as `@/components/ui/segmented-control`, `ui/segmented-control/segmented-control.component.tsx:60`)
- `ToastProvider`, `useToast`
- `cn`, types `StrictOmit`, `WrapperProps`

Note: `AnimatedBox` is listed in SKILL.md section 1, but `chill-ui-library/components/animatedBox/index.ts` only exports `BounceBox`. The repo builds its own: `const AnimatedBox = Animated.createAnimatedComponent(Box);` (`features/invite-friends/components/invite-friends-header/invite-friends-header-invited-friends.component.tsx:11`).

## Button (`ludo-ui/types/button.types.ts:13`)

```ts
export type ButtonProps = ChillUiButtonProps & {
  redirect?: RouteValues;
  image?: { source: string; contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'; className?: string };
  title?: string;
  titleProps?: ButtonTitleProps;
  contentProps?: ButtonContentProps;
  iconProps?: Omit<IconProps, 'name'> & { position?: 'left' | 'right' | 'left-outside' | 'right-outside'; name: TIconsAll };
  isLoading?: boolean;
  loaderProps?: Omit<ButtonLoaderProps, 'name'>;
};
```

`ChillUiButtonProps` (`chill-ui-library/types/button.types.ts:17`) adds `as?: 'touchable-opacity' | 'pressable' | 'ripple-pressable' | 'scale-pressable'`, `className?`, `isDisabled?`, `onPress?`, `style?`, `hasDisabledOpacity?` plus the `ButtonTv` variants (`Button.styles.tsx:83-122`): `size` `2xs | xs | sm | md | lg | xl | 2xl`, `variant` `contained | outlined | text`, `fit` (`self-start`), `colorVariant` `accent | danger | dark | error | info | inverted | light | muted | neutral | primary | secondary | success | tertiary | warning | white`.

Behavior (`button.component.tsx:7-44`): always `as="scale-pressable"`, `rounded-full`, `size="lg"` by default; `isLoading` disables the button and swaps the title for a white `swing` loader; the title is `font="primaryBold"`, one line, tail ellipsis; `redirect` wraps it in `<Link href asChild>`. Real use with `fit` and `colorVariant`: `features/settings/components/settings-blocked-users/settings-blocked-users-list-item/settings-blocked-users-list-item.component.tsx:54`.

## String (`ludo-ui/types/string.types.ts:4`)

```ts
export type StringProps = StringPropsChillUi & { redirect?: RouteValues; truncate?: boolean };
```

`StringPropsChillUi` (`chill-ui-library/types/string.types.ts:9`) = RN `TextProps` + `className?`, `color?`, `onPress?`, `useFastText?`, and tv variants from `String.styles.ts`: `variant` `body-xs | body-sm | body-1 | body-2 | body-3 | title-1..title-8` (default `body-1`), `size` `xs..9xl`, `position` `left | center | right`, `colorVariant` `black | danger | dark | disabled | error | info | inverted | light | muted | neutral | primary | ring | secondary | success | tertiary | warning | white`, `font` `primary|secondary|tertiary` x `Bold | ExtraBold | ExtraLight | Italic | Light | Medium | Regular | SemiBold | Thin`. `truncate` = `numberOfLines={1}` + `ellipsizeMode="tail"` (`string.component.tsx:9-12`). Note `colorVariant="black"` is set before `{...rest}`, so any passed value overrides it.

## List (`ludo-ui/types/list.types.ts:22`)

Required: `data: any[] | readonly any[]`, `ItemComponent: ComponentType<{ item: any }>`, `isLoading`, `isRefetching`, `isFetchingNextPage`, `hasNextPage`, `fetchNextPage: () => void`.
Optional: `SkeletonComponent?: ComponentType`, `refetch?: () => Promise<any>`, `emptyResultProps?: EmptyResultProps`, `ListStickyComponent?`, `ListTopComponent?` (component or element), `hasListStickyComponentTopSafeArea?`, `hasHeaderTransparent?`, `listHeaderComponentHeight?: number`, `hasRefreshControl?`, `triggerEndReachedOnStart?` (inverted lists such as chat), `listRef?: RefObject<LegendListRef | null>`, `hasTopSafeArea?`, `hasBottomSafeArea?`.
Everything else is `LegendListProps` minus `renderItem | getItemType | data | keyExtractor | children` (so `getFixedItemSize`, `contentContainerClassName`, `onScroll`, `ListHeaderComponent`... pass through).
`GetListFixedItemSize<ItemT = any> = (item, index, type: ListItemType | (string & {}) | undefined) => number | undefined` and `ListItemType = 'empty' | 'header_top' | 'loading' | 'row' | 'skeleton' | 'sticky'` (`list.types.ts:10-20`). Behavior is detailed in `lists-and-skeletons.md`.

## Wrapper (`chill-ui-library/types/wrapper.types.ts`)

`Wrapper` is a straight re-export. `WrapperProps = WrapperBaseProps` (`:29`) = RN `ViewProps` + `className?`, `safeArea?: WrapperSafeAreaEdge[]` (`'top'` / `'bottom'` / `'left'` / `'right'`, or with a spacing offset 1–8: `'bottom-4'` → `pb-safe-offset-4`) + variants from `Wrapper.styles.ts:9-28`: `px` `none | xs(4) | sm(8) | md(16) | lg(24) | xl(32)` (default `md`), `fill` (`flex-1`), `grow` (`flex-grow`).
Caveat: `Wrapper.tsx:36-39` passes `fill` straight to `wrapperTv`, so a bare `<Wrapper>` is **not** `flex-1`. `wrapperDefaultProps.fill = true` (`wrapper/utils/defaultProps.ts:7`) is imported by the scroll / safe-area / keyboard variants. SKILL.md says "fill (default true)"; the repo still writes `fill={false}` on `Wrapper` (`form-sheet-footer.component.tsx:31`).
Ludo variants: `WrapperKeyboardAwareScrollViewProps` adds `keyboardToolbarProps?`, `hasKeyboardToolbar?` (`wrapper-keyboard-aware-scroll-view.types.ts:4`). `WrapperSafeAreaView` is chill-ui's, re-exported as is (default `safeArea={['top', 'bottom']}`; `pb-safe` already adds 8px on Android).

## Skeleton (`ludo-ui/types/skeleton.types.ts:3`)

`SkeletonProps = ChillUiSkeletonProps` = `VariantProps<typeof skeletonTv> & ViewProps & { className?: string }` (`chill-ui-library/types/skeleton.types.ts:9`). Variants (`Skeleton.styles.ts`): `variant` `circle | rectangle | square | text` (default `rectangle`, `w-full rounded-lg`), `size` `xs | sm | md | lg | xl` (default `md`). Size is the compound height: `text` xs/sm/md/lg/xl = `h-4/h-5/h-6/h-7/h-8`; `square` and `circle` = `size-16/24/32/48/64`; `rectangle` = `h-16/24/32/48/64`. The wrapper renders `SkeletonPulse` with `cn('bg-black/20', className)` (`skeleton.component.tsx:10`), so override size with `className` (`size-14`, `w-32`, `size-full rounded-none`).

## Other prop types worth knowing

- `Avatar`: `data: { firstname: string; imageUrl?: ImageSource; lastname?: string }`, `colorVariant?: 'primary' | 'secondary'`, `contentProps?` (`avatar.types.ts:4`); `imageUrl` must be `{ uri }`, not a string (`avatar-me.component.tsx:14`).
- `FormInput<T>`: `UseControllerProps` (minus `defaultValue`) + chill `InputFieldProps` + `label?`, `hasError?`, `hasMessageError?`, `hasErrorTranslation?`, `hasClearIcon?`, `hasLengthCounter?`, `leftIconAction?`, `rightIconAction?`, `rightContentProps?`, `inputFieldClassName?`, `inputContainerClassName?` (`form-input.types.ts:7`). `hasErrorTranslation` is passed in `my-fields-add.formsheet.tsx:107`, not in `profil-edit-name.formsheet.tsx`.
- `IconButton`: `iconName: TIconName | TIconNameChillUi` + chill props (`as`, `iconColor`, `size`, `variant`, `colorVariant`, `isLoading`) (`icon-button.types.ts:5`).
- `Chip`: like `Button` (`title`, `iconProps`, `redirect`, `isLoading`) (`chip.types.ts:6`). `Badge`: `title` required, `show?` (`badge.types.ts:3`). `Link`: `href: RouteValues` (`link.types.ts:5`). `ScrollView`: `hasRefreshControl?`, `isRefetching?`, `refetch?`, `contentContainerClassName?` (`scroll-view.component.tsx:8`). `BlurView`: `onIos?: 'glass' | 'blur'`, `onAndroid?: 'blur' | 'view'` (`blur-view.types.ts:5`).

## Inconsistency to avoid copying

27 files under `features/` and `app/` import via `@/components/ludo-ui` or `@/components/chill-ui-library` (for example `features/players/components/players-list/players-list.component.tsx:4`, `features/profil/formsheets/profil-actions.formsheet.tsx:10`). New code uses `@ludo/ui` / `@chillui/ui`.
