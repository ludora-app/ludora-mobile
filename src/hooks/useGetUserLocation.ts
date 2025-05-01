import { useEffect } from 'react';
import * as Location from 'expo-location';
import useUserLocationStore from '@/stores/user-localtion.store';

const useGetUserLocation = () => {
  const setLocation = useUserLocationStore(state => state.setLocation);

  useEffect(() => {
    async function getCurrentLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    }
    getCurrentLocation();
  }, [setLocation]);
};

export default useGetUserLocation;
