import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

export const MAX_BIO_LENGTH = 150;

export const profilEditBioSchema = (t: TolgeeInstance['t']) =>
  z.object({
    bio: z.string().max(MAX_BIO_LENGTH, t('common.error.too_long', { length: MAX_BIO_LENGTH })),
  });

export type ProfilEditBioSchema = z.infer<typeof profilEditBioSchema>;
