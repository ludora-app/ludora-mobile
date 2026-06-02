// Convert meters to kilometers, keeping one decimal so sub-kilometre distances
// stay visible (e.g. 400 m -> 0.4 km) instead of collapsing to "0 km".
export const convertMToKm = (m: number) => Math.round(m / 100) / 10;
