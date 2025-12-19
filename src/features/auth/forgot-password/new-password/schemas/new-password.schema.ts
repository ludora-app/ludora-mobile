import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

import { passwordSchema } from '@/utils/zod-schemas.utils';

export const formSchema = (t: TolgeeInstance['t']) =>
  z
    .object({
      confirmPassword: passwordSchema(t),
      newPassword: passwordSchema(t),
    })
    .refine(data => data.newPassword === data.confirmPassword, {
      message: 'Les mots de passe ne correspondent pas',
      path: ['confirmPassword'],
    });

export type NewPasswordFormData = z.infer<typeof formSchema>;
