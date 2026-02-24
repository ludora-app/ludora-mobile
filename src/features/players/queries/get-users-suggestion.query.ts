import { useUsersFindAllInfinite } from '@generatedApi/users/users.api';

import { UsersFindAllParams } from '@/api/generated/model';

export const useGetUsersSuggestion = (filter: UsersFindAllParams) =>
  useUsersFindAllInfinite(filter, {
    query: {
      getNextPageParam: lastPage => lastPage?.data?.nextCursor,
    },
  });
