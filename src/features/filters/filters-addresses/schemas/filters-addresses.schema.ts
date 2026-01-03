import { z } from 'zod';

export const filtersAddressesSchema = z.object({
  address: z.string(),
});

export type FiltersAddressesSchema = z.infer<typeof filtersAddressesSchema>;
