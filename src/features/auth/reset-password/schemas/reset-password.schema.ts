import { z } from 'zod';

export const formSchema = z.object({
  email: z.email('Email invalide'),
});

export type ResetPasswordFormData = z.infer<typeof formSchema>;
