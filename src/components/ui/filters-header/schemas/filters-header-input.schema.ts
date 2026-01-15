import { z } from 'zod';

export const filtersHeaderInputSchema = z.object({
  search: z.string().min(1).max(100),
});

export type FiltersHeaderInputSchema = z.infer<typeof filtersHeaderInputSchema>;
