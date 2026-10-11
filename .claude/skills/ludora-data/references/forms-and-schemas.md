# Forms and schemas

Real zod v4 schema factories, shared building blocks and react-hook-form usage (single form, multi-step with store sync). Paths relative to `src/`.

## 1. Shared building blocks (`utils/zod-schemas.utils.ts`)

| Export | Signature | Notes |
|---|---|---|
| `passwordSchema(t)` | `z.string(...).min(8).refine(...)` x4 | lower, upper, digit, special char; keys `zod.password.*` (lines 6-14) |
| `nameSchema(t)` | string, min 2, max 50, `NAME_REGEX` | `NAME_REGEX` is exported and reused directly (`features/auth/register/screens/register-step-2.screen.tsx:11`) (lines 16-24) |
| `emailSchema(t?)` | `z.email({ message }).toLowerCase()` | `t` optional: without it the message is the raw key (lines 26-27) |
| `birthdateSchema(t?)` | `z.date(...)` + `refine` age >= 15 | `t` optional, same raw-key fallback (lines 29-36) |

Messages come from `t('...')` inside the factory, so the factory must be called with the current `t` (`useTranslate`).

## 2. Factory schema with a shared block

`features/profil/schemas/profil-edit-name.schema.ts:6-12`:
```ts
export const profilEditNameSchema = (t: TolgeeInstance['t']) =>
  z.object({
    firstname: nameSchema(t),
    lastname: nameSchema(t),
  });

export type ProfilEditNameSchema = z.infer<typeof profilEditNameSchema>;
```
Warning: `z.infer<typeof factory>` on a function does not give the form type (it resolves to `unknown`). The correct form, used in `features/settings/schemas/contact.schema.ts:21` and `features/create-session/schemas/create-session-step-3.schema.ts:47`, is `z.infer<ReturnType<typeof contactSchema>>`. The same wrong pattern is in `profil-edit-name.schema.ts:12`, `auth/forgot-password/new-password/schemas/new-password.schema.ts:17`, `auth/login/schemas/login.schema.ts:14`, `auth/register/schemas/register-step-2.schema.tsx:26`. Call sites dodge it with `useForm<z.infer<typeof schema>>` where `schema = factory(t)` (see section 4).

## 3. Cross-field validation (confirm password)

`features/profil/schemas/profil-edit-password.schema.ts:6-21` uses `superRefine` and targets the confirm field:
```ts
z.object({
  confirmPassword: z.string({ error: t('common.input_confirm_password_invalid_required') }),
  newPassword: passwordSchema(t),
  oldPassword: z.string(),
}).superRefine(({ confirmPassword, newPassword }, ctx) => {
  if (newPassword !== confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: t('common.input_confirm_password_invalid_match'),
      path: ['confirmPassword'],
    });
  }
});
```
`new-password.schema.ts:12-15` achieves the same with `.refine(data => ..., { message, path: ['confirmPassword'] })`. `register-step-2.schema.tsx:6-24` combines `birthdateSchema`, `emailSchema`, `nameSchema` x2, `passwordSchema` + the `superRefine`.

## 4. Single form, submit with mutation

`features/profil/formsheets/profil-edit-name.formsheet.tsx:25-35, 75-93`:
```tsx
const schema = profilEditNameSchema(t);
const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
  defaultValues: {
    firstname: userMe?.firstname,
    lastname: userMe?.lastname,
  },
  mode: 'onChange',
  resolver: zodResolver(schema),
});
// ...
<FormInput control={control} name="lastname" placeholder={t('common.input_lastname_placeholder')} label={t('common.input_lastname_label')} />
// ...
<ProfilEditFooter handleSubmit={handleSubmit(onSubmit)} isLoading={isUpdatingUserMe} />
```
`onSubmit` (lines 35-73) first skips the call when nothing changed (`router.back(); return;`), then `try { await updateUserMe(data); trackEvent; toast; router.back(); } catch { trackError; trackEvent(_failed) }`.

Variants:
- `mode: 'onSubmit'` with no `defaultValues` for sign-up (`register-step-2.screen.tsx:32-35`), body converts `birthdate: data.birthdate.toISOString()` before the mutation (line 41); `trigger` is destructured for manual validation.
- Static schema (no `t`) when messages are not needed: `profil-edit-email.schema.ts:5-7` (`emailSchema()`), `profil-edit-birthdate.schema.ts:5-7`, `profil-edit-sex.schema.ts:3-5` (`z.enum(['MALE', 'FEMALE', 'OTHER'])`). Their messages are raw keys, so they only suit UI that does not display the error text.
- Static schema with raw key messages: `features/my-fields/schemas/create-field.schema.ts:5-29` (`z.string('create-session.create-field.address_required')`, `z.enum(SessionCollectionItemDtoSport).array().min(1)` for a generated enum, `.refine(data => data.images.length <= 5, { path: ['images'] })`). It is not a factory; translate keys at render time if you display them.

## 5. Optional / nullable text with limits

`features/create-session/schemas/create-session-step-3.schema.ts:11-45`: exported length constants (`TITLE_MAX_LENGTH`, ...) reused by the screen for counters, each field `z.string().trim().max(N, t('common.error.too_long', { length: N })).regex(...).optional().nullable()`; team names add `.or(z.literal(''))` so an empty string passes.

## 6. Multi-step flow synced to a store

Create-session step 3 (`features/create-session/screens/create-session-step-3.screen.tsx:55-104`). The store owns the draft, the screen owns the form:
```tsx
const { description, teamAName, teamBName, title } = useCreateSessionStore(
  useShallow(state => ({
    description: state.session?.description,
    teamAName: state.session?.teamAName,
    teamBName: state.session?.teamBName,
    title: state.session?.title,
  })),
);
const setCreateSessionData = useCreateSessionStore(state => state.setSession);
const setIsStep3Valid = useCreateSessionStore(state => state.setIsStep3Valid);

const { control, formState: { isValid }, setValue } = useForm<CreateSessionStep3Schema>({
  defaultValues: { description: description || undefined, /* teamAName, teamBName, title likewise */ },
  mode: 'onChange',
  resolver: zodResolver(createSessionStep3Schema(t)),
});

// Sync validity with store
useEffect(() => {
  setIsStep3Valid(isValid);
}, [isValid, setIsStep3Valid]);

// Sync form values with store
const watchedValues = useWatch({ control });
useEffect(() => {
  const cleanedValues = {
    description: watchedValues.description?.trim(),
    // teamAName, teamBName, title trimmed likewise
  };
  setCreateSessionData({ ...cleanedValues, additionalData: { titleSource } });
}, [watchedValues, titleSource, setCreateSessionData]);
```
Why it works:
- Defaults are read back from the store, so going back to a step restores the values.
- `setSession` merges and drops `''`/null/undefined (`create-session.store.ts:36-53`), so cleared inputs disappear from the payload.
- The footer next-button reads `isStep3Valid` from the store to enable itself (`features/create-session/components/create-session-footer/create-session-footer-button-next-step.component.tsx:38-51`), because the footer lives outside the screen and cannot read `formState`.
- Programmatic changes go through `setValue('title', t(suggestedTitle))` (line 107) so the watcher syncs them too; extra metadata (`titleSource`) is carried in `additionalData`.
- The final step reads only the store (`create-session-footer-button-create-session.component.tsx:15-48`) and validates required fields by hand before calling `useCreateSession`.

## 7. Conventions recap seen in code

- Factory named `<form>Schema` (profil, contact, step3) or generically `formSchema` (auth); export `<Form>Schema` type; Tolgee instance type is `TolgeeInstance['t']` from `@tolgee/react`.
- Object keys alphabetical, including inside `z.object` (`confirmPassword`, `newPassword`, `oldPassword`).
- `FormInput` and `FormDatePickerInput` take `control` + `name`; submit through `handleSubmit(onSubmit)`; button loading state is the mutation's `isPending`.
