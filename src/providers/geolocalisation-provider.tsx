import { useEffect } from 'react';

import useGetUserLocation from '@/hooks/user-location.hook';

export default function GeolocalisationProvider() {
  const { getCurrentLocation } = useGetUserLocation({ type: 'SESSIONS' });

  const getUserLocation = async () => {
    await getCurrentLocation();
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return null;
}
