import { usePostPlaces } from '@/api/hooks/places.hook';
import { PostPlacesParams } from '@/api/queries/places.query';

export const useSearchPlaces = () => {
  const mutation = usePostPlaces();

  const mutateAsync = async (params: PostPlacesParams) => mutation.mutateAsync(params);

  return {
    ...mutation,
    mutateAsync,
  };
};
