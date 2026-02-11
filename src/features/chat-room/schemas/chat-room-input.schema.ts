import { z } from 'zod';

export const schema = z.object({
  message: z.string().min(1).max(255).trim(),
});

export type ChatRoomInputSchema = z.infer<typeof schema>;
