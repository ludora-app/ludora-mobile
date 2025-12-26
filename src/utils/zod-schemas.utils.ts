import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

const MIN_PASSWORD_LENGTH = 8;
export const passwordSchema = (t: TolgeeInstance['t']) =>
  z
    .string(t('zod.password.min_length', { length: MIN_PASSWORD_LENGTH }))
    .min(MIN_PASSWORD_LENGTH, t('zod.password.min_length', { length: MIN_PASSWORD_LENGTH }))
    .refine(val => /[a-z]/.test(val), t('zod.password.min_lower'))
    .refine(val => /[A-Z]/.test(val), t('zod.password.min_upper'))
    .refine(val => /[^a-zA-Z0-9]/.test(val), t('zod.password.caractere_special'));

export const NAME_REGEX = /^[\p{L}\p{M}' -]*$/u;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 50;
export const nameSchema = (t: TolgeeInstance['t']) =>
  z
    .string({ error: t('common.input_invalid_required') })
    .min(2, { message: t('common.input_firstname_invalid_short', { length: MIN_NAME_LENGTH }) })
    .max(50, { message: t('common.input_firstname_invalid_long', { length: MAX_NAME_LENGTH }) })
    .regex(NAME_REGEX, { message: t('common.input_name_invalid_format') });

export const emailSchema = (t?: TolgeeInstance['t']) =>
  z.email({ message: t?.('common.input_email_invalid') || 'common.input_email_invalid' }).toLowerCase();
