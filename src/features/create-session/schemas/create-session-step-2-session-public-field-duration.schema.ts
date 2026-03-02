import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

import dayjs from '@/lib/dayjs';

import { CREATE_SESSION } from '../constants/create-session.constants';

export const createSessionStep2SessionPublicFieldDurationFormSchema = (t: TolgeeInstance['t'], startDate?: string) =>
  z.object({
    duration: z.string().superRefine((val, ctx) => {
      const num = parseInt(val, 10);
      if (Number.isNaN(num) || num < CREATE_SESSION.MIN_DURATION || num > CREATE_SESSION.MAX_DURATION) {
        ctx.addIssue({
          code: 'custom',
          message: t('create-session-step-2.public-availabilities-form-sheet.error_duration', {
            max: CREATE_SESSION.MAX_DURATION,
            min: CREATE_SESSION.MIN_DURATION,
          }),
        });
        return;
      }

      if (startDate) {
        const start = dayjs(startDate);
        const end = start.add(num, 'minute');
        const nextMidnight = start.clone().add(1, 'day').startOf('day');
        if (end.isAfter(nextMidnight)) {
          ctx.addIssue({
            code: 'custom',
            message: t('create-session-step-2.public-availabilities-form-sheet.error_duration_past_midnight'),
          });
        }
      }
    }),
  });

export type CreateSessionStep2SessionPublicFieldDurationFormSchema = z.infer<
  ReturnType<typeof createSessionStep2SessionPublicFieldDurationFormSchema>
>;
