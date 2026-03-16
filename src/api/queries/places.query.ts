import ky from 'ky';
import * as Application from 'expo-application';

import { IS_IOS } from '@/constants/platform.constants';
import { Place, PlacesResponse } from '@/features/filters/filters-addresses/types/filters-addresses.types';

export type PostPlacesParams = {
  input: string;
  queryCountries?: string[];
};

const API_KEY = IS_IOS
  ? process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_IOS_KEY
  : process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_ANDROID_KEY;

const getSecurityHeaders = () => {
  const headers: Record<string, string> = {};
  if (IS_IOS) {
    if (Application.applicationId) {
      headers['X-Ios-Bundle-Identifier'] = Application.applicationId;
    }
  } else {
    headers['X-Android-Package'] = Application.applicationId;
    headers['X-Android-Cert'] = process.env.EXPO_PUBLIC_ANDROID_CERT;
  }
  return headers;
};

export const POST = async ({ input, queryCountries = ['FR'] }: PostPlacesParams) => {
  const requestData = {
    includedRegionCodes: queryCountries || [],
    input,
  };

  const data = await ky
    .post('https://places.googleapis.com/v1/places:autocomplete', {
      headers: {
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': [
          'suggestions.placePrediction.placeId',
          'suggestions.placePrediction.place',
          'suggestions.placePrediction.text.text',
        ].join(','),
        ...getSecurityHeaders(),
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
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': fieldMask.join(','),
      ...getSecurityHeaders(),
    },
  }).json<Place>();

  return data;
};
