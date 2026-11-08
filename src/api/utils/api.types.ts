export interface SampleDTO {
  text: string;
}

export interface SampleResponse {
  text: string;
}

export type GeopfSearchFeature = {
  geometry: { coordinates: [number, number] };
  properties: {
    city?: string;
    context?: string;
    district?: string;
    id: string;
    name: string;
    postcode?: string;
    type: 'housenumber' | 'locality' | 'municipality' | 'street';
  };
};

export type GeopfSearchResponse = {
  features: GeopfSearchFeature[];
};

export type SearchPlace = {
  description: string;
  id: string;
  label: string;
  // Google Places autocomplete has no coordinates: they come from the place details on select
  location: { latitude: number; longitude: number } | null;
};
