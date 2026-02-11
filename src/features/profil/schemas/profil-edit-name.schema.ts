import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

import { nameSchema } from '@/utils/zod-schemas.utils';

export const profilEditNameSchema = (t: TolgeeInstance['t']) =>
  z.object({
    firstname: nameSchema(t),
    lastname: nameSchema(t),
  });

export type ProfilEditNameSchema = z.infer<typeof profilEditNameSchema>;
