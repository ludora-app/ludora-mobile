import { z } from 'zod';

import { emailSchema } from '@/utils/zod-schemas.utils';

export const profilEditEmailSchema = z.object({
  email: emailSchema(),
});

export type ProfilEditEmailSchema = z.infer<typeof profilEditEmailSchema>;
