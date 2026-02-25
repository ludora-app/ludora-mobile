import { z } from 'zod';

import { SessionCollectionItemDtoSport } from '@/api/generated/model';

export const createFieldSchema = z
  .object({
    address: z
      .string('create-session.create-field.address_required')
      .min(1, 'create-session.create-field.address_required'),
    images: z
      .array(
        z.object({
          name: z.string().min(1),
          order: z.number().min(0),
          type: z.string().min(1),
          uri: z.string().min(1),
        }),
        'create-session.create-field.at_least_one_image_required',
      )
      .min(1, 'create-session.create-field.at_least_one_image_required'),
    lat: z.number(),
    lng: z.number(),
    name: z.string('create-session.create-field.name_required').min(1, 'create-session.create-field.name_required'),
    shortAddress: z.string().min(1),
    sports: z.enum(SessionCollectionItemDtoSport).array().min(1),
  })
  .refine(data => data.images.length <= 5, {
    path: ['images'],
  });

export type CreateFieldSchema = z.infer<typeof createFieldSchema>;
