import { z } from 'zod';

export const formSchema = z.object({
  email: z.email('common.input_email_invalid'),
});

export type ResetPasswordFormData = z.infer<typeof formSchema>;
