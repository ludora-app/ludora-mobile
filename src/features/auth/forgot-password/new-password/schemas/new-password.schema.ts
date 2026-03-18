import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

import { passwordSchema } from '@/utils/zod-schemas.utils';

export const formSchema = (t: TolgeeInstance['t']) =>
  z
    .object({
      confirmPassword: z.string({ error: t('common.input_confirm_password_invalid_required') }),
      newPassword: passwordSchema(t),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: t('common.input_confirm_password_invalid_match'),
      path: ['confirmPassword'],
    });

export type NewPasswordFormData = z.infer<typeof formSchema>;
