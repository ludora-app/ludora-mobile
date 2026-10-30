import { Places } from '@/features/filters/filters-addresses/types/filters-addresses.types';

import { SearchPlace, GeopfSearchFeature } from './api.types';

/**
 * Maps an IGN result: districts become "Lyon 3e · Lyon · 69003",
 * cities "Lyon · Rhône · 69" and addresses "12 Rue de la Paix · Paris · 75002".
 */
export const toSearchPlaceFromGeopf = (feature: GeopfSearchFeature): SearchPlace => {
  const { city = '', context = '', district, id, name, postcode = '', type } = feature.properties;
  const [longitude, latitude] = feature.geometry.coordinates;
  const [departmentCode, departmentName] = context.split(',').map(part => part.trim());
  const location = { latitude, longitude };

  if (type === 'municipality' && !district) {
    return { description: [departmentName, departmentCode].filter(Boolean).join(' · '), id, label: name, location };
  }

  const label = type === 'municipality' && district ? district.replace(/ arrondissement$/i, '') : name;

  return { description: [city, postcode].filter(Boolean).join(' · '), id, label, location };
};

export const toSearchPlaceFromGoogle = ({ placePrediction }: Places): SearchPlace => ({
  description: placePrediction.structuredFormat?.secondaryText?.text ?? '',
  id: placePrediction.placeId,
  label: placePrediction.structuredFormat?.mainText.text ?? placePrediction.text.text,
  location: null,
});
