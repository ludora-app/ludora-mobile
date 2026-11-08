# Form sheets, dialogs and toasts

Real form sheet screens (single form, multi-view), the shared `FormSheetHeader` / `FormSheetFooter`, `DialogConfirm` in its uncontrolled and controlled forms, and toast usage. Routing of sheets (`_layout` options, `ROUTES`) is in ludora-navigation.

## Shared building blocks

No `index.ts`; import the component files (named exports):

```tsx
import { FormSheetFooter } from '@/components/ui/form-sheet/components/form-sheet-footer.component';
import { FormSheetHeader } from '@/components/ui/form-sheet/components/form-sheet-header.component';
import { FormSheetWrapper } from '@/components/ui/form-sheet/components/form-sheet-wrapper.component';
import { FormSheetContent } from '@/components/ui/form-sheet/components/form-sheet-content.component';
```

New sheets use the four together (`features/on-boarding/on-boarding-profile/formsheets/on-boarding-sport.formsheet.tsx`):

```tsx
<FormSheetWrapper>
  <FormSheetHeader />
  <FormSheetContent className="gap-4">...</FormSheetContent>
  <FormSheetFooter buttonTitle={t('common.validate')} onButtonPress={handleValidate} isButtonDisabled={!level} />
</FormSheetWrapper>
```

- **`FormSheetWrapper`**: root `Box` with `pt-2` (+ `pb-safe` on Android). **`FormSheetContent`**: `Wrapper fill={false}` with `pt-4 pb-6`. Both take `className`.
- **`FormSheetHeader`**: grabber bar (`h-1.5 w-11 rounded-full bg-border`) + optional title. Props: `title?: string`, `hasGoBack?: boolean`, `goBackAction?: () => void` (defaults to `useAppNavigation().goBack`, `go-back-button.component.tsx:15-20`). Without `title` it renders only the grabber (`filter-header.component.tsx:19`, `filters-calendar.screen.tsx:27`).
- **`FormSheetFooter`**: plain `Wrapper fill={false}` with `gap-2` (no background, shadow or safe area). Props: `buttonTitle?` + `onButtonPress?` + `isButtonDisabled?` (renders an `xl` primary `Button`), `className?`, `children` (extra buttons under it). Older sheets that need the white bar with a shadow and a bottom safe area use `FooterWrapper` instead.
- Footer convention: primary `Button` first, outlined cancel second.

## Single-form sheet: profile name

`features/profil/formsheets/profil-edit-name.formsheet.tsx` (95 lines). Anatomy:

1. Hooks: `useToast`, `useRouter`, `useUserMe`, the mutation (`isPending: isUpdatingUserMe, mutateAsync: updateUserMe`), `useTranslate`, `useAnalytics` (`:19-24`).
2. Schema factory with `t`: `const schema = profilEditNameSchema(t);` then `useForm<z.infer<typeof schema>>({ defaultValues, mode: 'onChange', resolver: zodResolver(schema) })` (`:25-33`).
3. `onSubmit`: no-op exit when nothing changed (`router.back()`), else `await updateUserMe(data)`, `trackEvent`, a toast chosen by what changed, `router.back()`; `catch (error)` -> `trackError({ error })` + failure event (`:35-73`).
4. Render (`:75-94`):

```tsx
<>
  <FormSheetHeader title={t('profil.profil-edit.name_title')} />
  <Wrapper fill={false} className="gap-2 pt-5 pb-20">
    <FormInput control={control} name="lastname" placeholder={t('common.input_lastname_placeholder')} label={t('common.input_lastname_label')} />
    ...
  </Wrapper>
  <ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
</>
```

`ProfilEditFooter` (`features/profil/components/profil-edit/profil-edit-footer.component.tsx:13-24`) is the feature footer shared by all `profil-edit-*` sheets:

```tsx
<FooterWrapper hasBottomSafeArea={IS_ANDROID}>
  <Button title={t('common.save')} onPress={handleSubmit} isLoading={isLoading} />
  <Button title={t('common.button_cancel')} onPress={router.back} variant="outlined" />
</FooterWrapper>
```

Variant with a scrolling body and a back arrow: `features/my-fields/formsheets/my-fields-add.formsheet.tsx:100-128` uses `<FormSheetHeader title={t('my-fields.add.title')} hasGoBack />`, `WrapperGestureHandlerScrollView fill={false} contentContainerClassName="gap-5 py-5"` and the footer buttons inline with `size="md"`. Reading route params: `useLocalSearchParams<LocalSearchParams>()` where `LocalSearchParams = RootStackParamList[typeof ROUTES.MY_FIELDS.ADD]` (`:22`, `:32`).

## Multi-view sheet: profile actions / report

`features/profil/formsheets/profil-actions.formsheet.tsx` (138 lines). One sheet, three views:

- `type FormSheetView = 'actions' | 'report-reasons' | 'report-reasons-other'` (`features/profil/types`, imported `:17`); `const [view, setView] = useState<FormSheetView>('actions')` (`:39`).
- Body switches with `view === '...' && (...)` blocks inside `<Wrapper className='gap-4 py-4'>` (`:105-120`): `actions` shows `ProfilHeaderActionsRemoveFriend`, `ProfilHeaderActionsBlockUser`, `ProfilHeaderActionsReportUser`; `report-reasons` shows the reason list; `report-reasons-other` shows a free-text input and a bottom-sheet submit button (`:133-136`).
- Header lives in its own component that maps `view` -> title key and implements the back stack (`profil-header-actions-report-header.component.tsx:13-46`):

```tsx
<FormSheetHeader title={t(handleTitle)} hasGoBack goBackAction={handleGoBack} />
```
`handleGoBack` goes `report-reasons-other` -> `report-reasons` -> `actions` -> `router.back()`. Route params arrive via `useLocalSearchParams<ParamsFormSheetActions>()` (`:35`).
- Root container is a `Box` with `style={{ paddingBottom: IS_ANDROID ? bottom : undefined }}` (`:100`) because there is no `FormSheetFooter`.
- The report confirmation is a controlled `DialogConfirm` owned by the sheet (`showConfirmDialog` state, `:41`, `:122-131`).

## DialogConfirm (`ui/dialog/dialog-confirm/dialog-confirm.component.tsx:18`)

Import: `import { DialogConfirm } from '@/components/ui/dialog/dialog-confirm';`. Props:

```ts
type DialogProps = {
  onConfirmPromise?: () => Promise<void>; onConfirm?: () => void; onCancel?: () => void;
  isLoading?: boolean; title?: string; content?: string;
  iconProps?: IconProps; showIcon?: boolean; centerContent?: boolean;
  source: string; confirmButtonTitleKey: string;
  priority?: 'confirm' | 'cancel'; open?: boolean; onOpenChange?: (open: boolean) => void;
};
```
Behavior (`:35-132`): `source` is required and sent as `dialog_confirm_open` analytics when it opens (`:60-64`). `confirmButtonTitleKey` is a key, translated inside (`t(confirmButtonTitleKey)`, `:117`); `title`/`content` are already-translated strings. `handleConfirm` awaits `onConfirmPromise`, then calls `onConfirm`, then closes (`:66-74`); an error thrown from `onConfirmPromise` would skip the close, but every real handler catches internally, so the dialog closes in all cases. `priority="cancel"` (default) makes Cancel the filled primary button and Confirm outlined danger; `priority="confirm"` flips it. Children become the `DialogTrigger`; with no children the dialog is only opened via `open`. `open !== undefined` switches to controlled mode (`:54-56`).

**Uncontrolled, trigger as children, destructive default priority**: `features/settings/components/settings-actions/settings-actions-delete-account/settings-actions-delete-account-action.component.tsx:33-43`:

```tsx
<DialogConfirm
  title={t("settings.delete_account_title")}
  content={t("settings.delete_account_content")}
  source="settings_delete_account"
  confirmButtonTitleKey="common.delete"
  showIcon
  onConfirmPromise={handleDeleteAccount}
  isLoading={isDeleteAccountLoading}
>
  <Button title={t('settings.delete_account_button')} colorVariant="danger" />
</DialogConfirm>
```

**Uncontrolled with `priority="confirm"`, trigger is a `QuickActionCard`**: `features/profil/components/profil-header/profil-header-actions/profil-header-actions-block-user.component.tsx:36-51`. The handler (`:22-34`) is the reference mutation flow: `await blockUser()` -> `trackEvent` -> `router.dismissAll()` -> `toast(...)`; `catch (error) { trackError({ error }); }`.

**Controlled, no children**: `.../profil-header-actions-report/profil-header-actions-report-confirm-dialog.component.tsx:50-60` passes `open={showConfirmDialog}` and `onOpenChange={setShowConfirmDialog}` and builds `content` from the selected reason with `t('profil.report_user_confirm_content', { name, reason: t(\`profil.report_reason_${selectedReason}\`) })` (`:43-46`).

**Inside a list item**: `settings-blocked-users-list-item.component.tsx:46-55` wraps a small `Button` and passes `isLoading` from `useUnblockUser(userUid).isPending`.

Other usages: `chat-room/components/chat-room-user-profil-formsheet/chat-room-block-user-dialog.component.tsx`, `chat-room-info/components/chat-room-info-session-actions.component.tsx`, `profil-header-actions-remove-friend.component.tsx`.

## Toasts

`const { toast } = useToast();` from `@chillui/ui` (`profil-edit-name.formsheet.tsx:2`; some files import the same hook from `@/components/chill-ui-library`, e.g. `profil-actions.formsheet.tsx:10`, prefer `@chillui/ui`). Real props (`chill-ui-library/types/toast.types.ts:51-80`): `message?`, `variant?: 'success' | 'error' | 'info' | 'warning'`, `title?`, `position?: 'top' | 'bottom'`, `duration?` (provider default 3000), `swipeable?`, `allowMultiple?`, `render?`, `id?`.

- Success after a mutation: `toast({ message: t('profil.report_user_success_message', { name: \`${firstname} ${lastname}\` }), variant: 'success' })` (`profil-actions.formsheet.tsx:78-81`). Order in the repo: navigate (`router.back()` / `dismissAll()`) then toast.
- Info that may repeat: `toast({ allowMultiple: true, message: t("profil.report_already_sent"), variant: "info" })` after matching `errorResponse.api_error_detail` (`:84-91`, constant `ALREADY_REPORTED_ERROR` at `:28`).
- Result of a form that stays on screen: `toast({ message: t('settings.contact.success_message'), variant: 'success' })` then `reset()` (`features/settings/screens/settings-contact.screen.tsx:39-43`).
- Errors do not get a toast in the handler: `trackError({ error })` shows the generic one (see ludora-data).

## Inconsistencies to avoid copying

- `profil-actions.formsheet.tsx`, `settings-actions-delete-account-action.component.tsx` and the report header/dialog components omit semicolons and mix quote styles; `profil-edit-name.formsheet.tsx` is the style reference.
- `FormSheetHeader`'s shadow style key is spelled `shadox` (`form-sheet-header.component.tsx:15`); harmless, do not copy the typo.
