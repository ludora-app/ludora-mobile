import { z } from 'zod';

import { emailSchema } from '@/utils/zod-schemas.utils';

export const formSchema = z.object({
  email: emailSchema(),
});

export type SendCodeFormData = z.infer<typeof formSchema>;
