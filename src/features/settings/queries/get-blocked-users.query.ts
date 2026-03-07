import { useModerationFindAllBlockedUsers } from '@generatedApi/moderation/moderation.api';

export const useGetBlockedUsers = () => {
  const { data, ...rest } = useModerationFindAllBlockedUsers();

  const { items } = data?.data ?? {};

  return { ...rest, items };
};
