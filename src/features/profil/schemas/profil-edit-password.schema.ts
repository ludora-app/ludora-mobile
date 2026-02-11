import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

import { passwordSchema } from '@/utils/zod-schemas.utils';

export const profilEditPasswordSchema = (t: TolgeeInstance['t']) =>
  z
    .object({
      confirmPassword: z.string({ error: t('common.input_confirm_password_invalid_required') }),
      newPassword: passwordSchema(t),
      oldPassword: z.string(),
    })
    .superRefine(({ confirmPassword, newPassword }, ctx) => {
      if (newPassword !== confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: t('common.input_confirm_password_invalid_match'),
          path: ['confirmPassword'],
        });
      }
    });

export type ProfilEditPasswordSchema = z.infer<typeof profilEditPasswordSchema>;
