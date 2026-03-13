import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

export const MAX_DESCRIPTION_LENGTH = 500;

export const profilReportDescriptionSchema = (t: TolgeeInstance['t']) =>
  z.object({
    description: z
      .string(t('common.input_invalid_required'))
      .min(1, t('common.input_invalid_required'))
      .max(MAX_DESCRIPTION_LENGTH, t('common.error.too_long', { length: MAX_DESCRIPTION_LENGTH })),
  });

export const dummySchema = profilReportDescriptionSchema(() => '');
export type ProfilReportDescriptionSchema = z.infer<typeof dummySchema>;
