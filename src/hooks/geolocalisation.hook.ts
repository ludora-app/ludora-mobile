import { useEffect } from 'react';
import * as Location from 'expo-location';

import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

const useGetUserLocation = () => {
  const setLocation = useUserLocationStore(state => state.setLocation);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
    }
    getCurrentLocation();
  }, [setLocation]);
};

export default useGetUserLocation;
