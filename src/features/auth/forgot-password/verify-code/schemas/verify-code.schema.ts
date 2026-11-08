import { z } from 'zod';

import { VERIFY_CODE_REGEX } from '../constants/verify-code.constants';

export const formSchema = z.object({
  code: z.string().regex(VERIFY_CODE_REGEX),
});

export type VerifyCodeFormData = z.infer<typeof formSchema>;
