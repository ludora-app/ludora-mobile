import { z } from 'zod';

export const profilEditSexSchema = z.object({
  sex: z.enum(['MALE', 'FEMALE', 'OTHER']),
});

export type ProfilEditSexSchema = z.infer<typeof profilEditSexSchema>;
