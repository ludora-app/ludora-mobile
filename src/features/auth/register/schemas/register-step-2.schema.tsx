import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

import { birthdateSchema, emailSchema, nameSchema, passwordSchema } from '@/utils/zod-schemas.utils';

export const formSchema = (t: TolgeeInstance['t']) =>
  z
    .object({
      birthdate: birthdateSchema(t),
      confirmPassword: z.string({ error: t('common.input_confirm_password_invalid_required') }),
      email: emailSchema(t),
      firstname: nameSchema(t),
      lastname: nameSchema(t),
      password: passwordSchema(t),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: 'custom',
          message: t('common.input_confirm_password_invalid_match'),
          path: ['confirmPassword'],
        });
      }
    });

export type formSchemaType = z.infer<typeof formSchema>;
