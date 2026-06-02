// Convert meters to kilometers, keeping one decimal so sub-kilometre distances
// stay visible (e.g. 400 m -> 0.4 km) instead of collapsing to "0 km".
export const convertMToKm = (m: number) => Math.round(m / 100) / 10;

export type FormattedDistance = { unit: 'm' | 'km'; value: number };

/**
 * Picks the most readable unit for a distance expressed in meters:
 *  - below 1 km  -> meters rounded to the nearest 10 m (e.g. 350 m)
 *  - 1 km and up -> kilometers with one decimal (e.g. 1.4 km)
 *
 * The unit is returned separately so the caller can localize the label.
 */
export const formatDistance = (meters: number): FormattedDistance => {
  const roundedMeters = Math.round(meters / 10) * 10;
  if (roundedMeters < 1000) {
    return { unit: 'm', value: roundedMeters };
  }
  return { unit: 'km', value: convertMToKm(meters) };
};
