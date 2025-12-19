import { z } from 'zod';

export const formSchema = z.object({
  code1: z.string().min(1).max(1),
  code2: z.string().min(1).max(1),
  code3: z.string().min(1).max(1),
  code4: z.string().min(1).max(1),
  code5: z.string().min(1).max(1),
  code6: z.string().min(1).max(1),
});

export type VerifyCodeFormData = z.infer<typeof formSchema>;
