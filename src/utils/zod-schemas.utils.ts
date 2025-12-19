import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

const MIN_PASSWORD_LENGTH = 12;
export const passwordSchema = (t: TolgeeInstance['t']) =>
  z
    .string(t('zod.password.min_length', { length: MIN_PASSWORD_LENGTH }))
    .min(MIN_PASSWORD_LENGTH, t('zod.password.min_length', { length: MIN_PASSWORD_LENGTH }))
    .refine(val => /[a-z]/.test(val), t('zod.password.min_lower'))
    .refine(val => /[A-Z]/.test(val), t('zod.password.min_upper'))
    .refine(val => /[^a-zA-Z0-9]/.test(val), t('zod.password.caractere_special'));
