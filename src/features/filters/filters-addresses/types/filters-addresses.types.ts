import ROUTES from '@/constants/routes.constants';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';

export type FiltersAddressesScreenParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];

export type FiltersAddressesReturnParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];

export type addressComponentsTypes = 'postal_code' | 'locality' | 'country' | 'street_number' | 'route';
export interface Place {
  /** Full formatted address (e.g., "123 Main St, New York, NY 10001, USA") */
  formattedAddress: string;
  /** Short formatted address (e.g., "123 Main St, New York") */
  shortFormattedAddress: string;
  /** Location coordinates for mapping */
  location: {
    /** Latitude coordinate */
    latitude: number;
    /** Longitude coordinate */
    longitude: number;
  };
  /** Postal address details (optional, may contain additional postal information) */
  postalAddress?: {
    /** Postal address components */
    [key: string]: any;
  };
  /** Address components with detailed information for each part of the address */
  addressComponents: {
    /** Language code for the component text */
    languageCode: string;
    /** Long text description (e.g., "New York" for locality) */
    longText: string;
    /** Short text description (e.g., "NY" for administrative_area_level_1) */
    shortText: string;
    /** Types of address component (e.g., ['locality', 'political']) */
    types: addressComponentsTypes[];
  }[];
}

export interface Places {
  /** Place prediction information containing the suggestion details */
  placePrediction: {
    /** Unique place ID used to fetch detailed place information */
    placeId: string;
    /** Place details (may be undefined for predictions, populated after selection) */
    place?: Place;
    /** Text information for display in the dropdown */
    text: {
      /** Display text shown in the autocomplete dropdown */
      text: string;
    };
  };
}

export interface PlacesResponse {
  /** Array of place suggestions returned by the autocomplete API */
  suggestions?: Places[];
  /** Error information if the API call failed */
  error?: {
    /** Error message describing what went wrong */
    message: string;
    /** Error code (HTTP status code or API-specific code) */
    code?: number;
  };
}
