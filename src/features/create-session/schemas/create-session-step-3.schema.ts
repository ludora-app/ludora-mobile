import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

const noSpecialCharsRegex = /^[a-zA-Z0-9\sàâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ'’‘:,.!? -]*$/u;

export const DESCRIPTION_MAX_LENGTH = 500;
export const TEAM_NAME_MAX_LENGTH = 15;
export const TITLE_MAX_LENGTH = 60;
export const TEAM_NAME_MIN_LENGTH = 3;

export const createSessionStep3Schema = (t: TolgeeInstance['t']) =>
  z.object({
    description: z
      .string()
      .max(DESCRIPTION_MAX_LENGTH, t('common.error.too_long', { length: DESCRIPTION_MAX_LENGTH }))
      .regex(noSpecialCharsRegex, t('common.error.special_characters_not_allowed'))
      .optional()
      .nullable(),
    teamAName: z
      .string()
      .min(TEAM_NAME_MIN_LENGTH, t('common.error.too_short', { length: TEAM_NAME_MIN_LENGTH }))
      .max(TEAM_NAME_MAX_LENGTH, t('common.error.too_long', { length: TEAM_NAME_MAX_LENGTH }))
      .regex(noSpecialCharsRegex, t('common.error.special_characters_not_allowed'))
      .or(z.literal(''))
      .optional()
      .nullable(),
    teamBName: z
      .string()
      .min(TEAM_NAME_MIN_LENGTH, t('common.error.too_short', { length: TEAM_NAME_MIN_LENGTH }))
      .max(TEAM_NAME_MAX_LENGTH, t('common.error.too_long', { length: TEAM_NAME_MAX_LENGTH }))
      .regex(noSpecialCharsRegex, t('common.error.special_characters_not_allowed'))
      .or(z.literal(''))
      .optional()
      .nullable(),
    title: z
      .string()
      .max(TITLE_MAX_LENGTH, t('common.error.too_long', { length: TITLE_MAX_LENGTH }))
      .regex(noSpecialCharsRegex, t('common.error.special_characters_not_allowed'))
      .optional()
      .nullable(),
  });

export type CreateSessionStep3Schema = z.infer<ReturnType<typeof createSessionStep3Schema>>;
