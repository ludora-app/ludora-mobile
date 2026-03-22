import { z } from 'zod';
import { TolgeeInstance } from '@tolgee/react';

export const schema = (t: TolgeeInstance['t']) =>
  z.object({
    message: z
      .string()
      .min(1)
      .max(1000, t('common.error.too_long', { length: 1000 }))
      .trim(),
  });

export type ChatRoomInputSchema = z.infer<ReturnType<typeof schema>>;
