import { z } from 'zod';

export const createSessionStep2FieldsListHeaderInputSchema = z.object({
  search: z.string().min(1).max(100),
});

export type CreateSessionStep2FieldsListHeaderInputSchema = z.infer<
  typeof createSessionStep2FieldsListHeaderInputSchema
>;
