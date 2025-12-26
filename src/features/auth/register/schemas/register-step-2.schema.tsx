import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

import { emailSchema, nameSchema, passwordSchema } from '@/utils/zod-schemas.utils';

export const formSchema = (t: TolgeeInstance['t']) =>
  z
    .object({
      birthdate: z
        .date({
          error: t('common.input_birthdate_invalid_required'),
        })
        .refine(
          date => {
            const minDate = new Date();
            minDate.setFullYear(minDate.getFullYear() - 15);
            return date <= minDate;
          },
          {
            message: t('common.input_birthdate_invalid_age'),
          },
        ),
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
