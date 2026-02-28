import * as Location from 'expo-location';
import { useTranslate } from '@tolgee/react';
import { useCallback, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native'; // Importations nécessaires

import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { useAnalytics } from './analytics-trackers.hook';

interface UseGetUserLocationProps {
  showAlert?: boolean;
  type?: 'SESSIONS' | 'FIELDS';
}

const useGetUserLocation = ({ showAlert = false, type = 'FIELDS' }: UseGetUserLocationProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const setLocation = useUserLocationStore(state => state.setLocation);

  const { trackError } = useAnalytics();
  const { t } = useTranslate();

  const getCurrentLocation = useCallback(async (): Promise<{ locationFound: boolean }> => {
    setIsLoading(true);
    const { canAskAgain, status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      if ((status === 'denied' || !canAskAgain) && showAlert) {
        Alert.alert(t('location.title'), t(`location.description_${type}`), [
          { style: 'cancel', text: t('common.button_cancel') },
          {
            onPress: () => {
              if (Platform.OS === 'ios') {
                Linking.openURL('app-settings:');
              } else {
                Linking.openSettings();
              }
            },
            text: t('common.button_open_settings'),
          },
        ]);
      }
      setIsLoading(false);
      return { locationFound: false };
    }

    try {
      const userLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      });
      return { locationFound: true };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      const isLocationUnavailable =
        message.includes('Current location is unavailable') ||
        message.includes('location services');
      if (!isLocationUnavailable) {
        trackError({ error, showToast: false });
      }
      return { locationFound: false };
    } finally {
      setIsLoading(false);
    }
  }, [setLocation, t, showAlert, type, trackError]);

  return { getCurrentLocation, isLoading };
};

export default useGetUserLocation;
