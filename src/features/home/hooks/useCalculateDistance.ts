import useUserLocationStore from '@/stores/user-geolocalisation.store';

const R = 6371; // Rayon de la Terre en km
function toRadians(value: number) {
  return (value * Math.PI) / 180;
}
function useCalculateDistance(sessionLocation: { latitude: number; longitude: number }) {
  const { location: userLocation } = useUserLocationStore();
  if (!userLocation) return 0;

  const dLat = toRadians(sessionLocation.latitude - userLocation.coords.latitude);
  const dLon = toRadians(sessionLocation.longitude - userLocation.coords.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(userLocation.coords.latitude)) *
      Math.cos(toRadians(sessionLocation.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  const distanceInKm = distance.toFixed(2);
  return distanceInKm;
}

export default useCalculateDistance;
