import { z } from 'zod';

export const inviteFriendsSearchSchema = z.object({
  search: z.string(),
});

export type InviteFriendsSearchSchema = z.infer<typeof inviteFriendsSearchSchema>;
