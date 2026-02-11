import { z } from 'zod';

import { birthdateSchema } from '@/utils/zod-schemas.utils';

export const profilEditBirthdateSchema = z.object({
  birthdate: birthdateSchema(),
});

export type ProfilEditBirthdateSchema = z.infer<typeof profilEditBirthdateSchema>;
