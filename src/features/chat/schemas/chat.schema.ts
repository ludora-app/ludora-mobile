import { z } from 'zod';

export const schema = z.object({
  search: z.string().min(1).max(255).trim(),
});

export type ChatInputSchema = z.infer<typeof schema>;
