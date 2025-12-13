import { useQueryClient } from '@tanstack/react-query';

export function useInvalidateQuery(queryKey: readonly string[]) {
  const queryClient = useQueryClient();
  return function invalidateQuery() {
    return queryClient.invalidateQueries({
      queryKey,
    });
  };
}
