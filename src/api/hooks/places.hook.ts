import { useCallback } from 'react';
import { PlacesResponse } from '@chillui/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEY } from '../utils/api.queryKey';
import { POST as postPlaces, PostPlacesParams, GET as getPlace } from '../queries/places.query';

export function usePostPlaces() {
  return useMutation({
    mutationFn: (params: PostPlacesParams) => postPlaces(params) as Promise<PlacesResponse>,
  });
}

export function useGetPlace() {
  const queryClient = useQueryClient();

  return useCallback(
    async (id: string) => {
      if (!id) return null;
      return queryClient.fetchQuery({
        queryFn: () => getPlace({ id }),
        queryKey: [QUERY_KEY.GET_ADDRESS_PLACE(id)],
        staleTime: 1000 * 60 * 5,
      });
    },
    [queryClient],
  );
}
