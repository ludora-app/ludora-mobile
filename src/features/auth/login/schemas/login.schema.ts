import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

const MIN_PASSWORD_LENGTH = 8;

export const formSchema = (t: TolgeeInstance['t']) =>
  z.object({
    email: z.email(t('common.input_email_invalid')).toLowerCase().trim(),
    password: z
      .string(t('common.input_password_required'))
      .min(MIN_PASSWORD_LENGTH, t('zod.password.min_length', { length: MIN_PASSWORD_LENGTH })),
  });

export type LoginFormData = z.infer<typeof formSchema>;
