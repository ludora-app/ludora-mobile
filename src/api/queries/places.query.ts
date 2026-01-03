import ky from 'ky';

import { Place, PlacesResponse } from '@/components/chill-ui-library/types';

export type PostPlacesParams = {
  input: string;
  queryCountries?: string[];
};

export const POST = async ({ input, queryCountries = ['FR'] }: PostPlacesParams) => {
  const requestData = {
    includedRegionCodes: queryCountries || [],
    input,
  };

  const data = await ky
    .post('https://places.googleapis.com/v1/places:autocomplete', {
      headers: {
        'X-Goog-Api-Key': process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
        'X-Goog-FieldMask': [
          'suggestions.placePrediction.placeId',
          'suggestions.placePrediction.place',
          'suggestions.placePrediction.text.text',
        ].join(','),
      },
      json: requestData,
    })
    .json<PlacesResponse>();

  return data;
};

export type GetPlaceFieldMask =
  | 'location'
  | 'formattedAddress'
  | 'postalAddress'
  | 'shortFormattedAddress'
  | 'addressComponents'
  | 'id';

export type GetPlaceParams = {
  id: string;
  fieldMask?: GetPlaceFieldMask[];
};

export const GET = async ({
  fieldMask = ['location', 'formattedAddress', 'postalAddress', 'shortFormattedAddress', 'addressComponents', 'id'],
  id,
}: GetPlaceParams): Promise<Place> => {
  const data = await ky(`https://places.googleapis.com/v1/places/${id}`, {
    headers: {
      'X-Goog-Api-Key': process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
      'X-Goog-FieldMask': fieldMask.join(','),
    },
  }).json<Place>();

  return data;
};
