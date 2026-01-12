import { useQueryClient, QueryKey } from '@tanstack/react-query';

export function useInvalidateQuery(queryKey: QueryKey) {
  const queryClient = useQueryClient();
  return function invalidateQuery() {
    return queryClient.invalidateQueries({
      queryKey,
    });
  };
}
