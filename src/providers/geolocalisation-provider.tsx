import useGetUserLocation from '@/hooks/geolocalisation.hook';

export default function GeolocalisationProvider() {
  useGetUserLocation();

  return null;
}
