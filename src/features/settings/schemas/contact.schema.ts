import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

export const MESSAGE_MAX_LENGTH = 500;
const MESSAGE_MIN_LENGTH = 10;
const SUBJECT_MIN_LENGTH = 3;
export const SUBJECT_MAX_LENGTH = 50;

export const contactSchema = (t: TolgeeInstance['t']) =>
  z.object({
    message: z
      .string(t('common.error.too_short', { length: MESSAGE_MIN_LENGTH }))
      .min(MESSAGE_MIN_LENGTH, t('common.error.too_short', { length: MESSAGE_MIN_LENGTH }))
      .max(MESSAGE_MAX_LENGTH, t('common.error.too_long', { length: MESSAGE_MAX_LENGTH })),
    subject: z
      .string(t('common.error.too_short', { length: SUBJECT_MIN_LENGTH }))
      .min(SUBJECT_MIN_LENGTH, t('common.error.too_short', { length: SUBJECT_MIN_LENGTH }))
      .max(SUBJECT_MAX_LENGTH, t('common.error.too_long', { length: SUBJECT_MAX_LENGTH })),
  });

export type ContactSchema = z.infer<ReturnType<typeof contactSchema>>;
