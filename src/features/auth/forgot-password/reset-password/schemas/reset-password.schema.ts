import { z } from 'zod';

import { emailSchema } from '@/utils/zod-schemas.utils';

export const formSchema = z.object({
  email: emailSchema(),
});

export type ResetPasswordFormData = z.infer<typeof formSchema>;
