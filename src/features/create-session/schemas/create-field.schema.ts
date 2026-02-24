import { z } from 'zod';

import { SessionCollectionItemDtoSport } from '@/api/generated/model';

export const createFieldSchema = z
  .object({
    address: z.string().min(1, 'Adresse requise'),
    images: z
      .array(
        z.object({
          file: z.string().min(1), // URI en form state, conversion en Blob à l'envoi API
          name: z.string(),
          order: z.number(),
        }),
      )
      .min(1, 'Images requises'),
    lat: z.number(),
    lng: z.number(),
    name: z.string().min(1, 'Nom requis'),
    shortAddress: z.string().min(1, 'Adresse courte'),
    sports: z.enum(SessionCollectionItemDtoSport).array().min(1, 'Sports requis'),
  })
  .refine(data => data.images.length <= 5, {
    message: 'Vous ne pouvez pas ajouter plus de 5 images',
    path: ['images'],
  });

export type CreateFieldSchema = z.infer<typeof createFieldSchema>;
