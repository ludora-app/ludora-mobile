import { useState } from 'react';
import { useToast } from '@chillui/ui';
import * as Location from 'expo-location';
import { useTranslate } from '@tolgee/react';

import useGetUserLocation from '@/hooks/user-location.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { useOnBoardingStore } from '../../stores/on-boarding.store';

async function getLocationLabel(coords: { latitude: number; longitude: number }) {
  try {
    const [address] = await Location.reverseGeocodeAsync(coords);
    return address?.city ?? address?.subregion ?? address?.region ?? null;
  } catch {
    return null;
  }
}

/**
 * Asks for the location permission and uses the current position as the play area.
 * The label comes from the native reverse geocoding.
 */
export const useOnBoardingPlayAreaLocation = () => {
  const { t } = useTranslate();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [isGeocoding, setIsGeocoding] = useState(false);
  const setPlayArea = useOnBoardingStore(state => state.setPlayArea);
  const { getCurrentLocation, isLoading } = useGetUserLocation({ showAlert: true, type: 'SESSIONS' });

  const locate = async () => {
    const { locationFound } = await getCurrentLocation();
    const { location } = useUserLocationStore.getState();

    if (!locationFound || !location) {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.LOCATION_PERMISSION_DENIED });
      }
      return;
    }

    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.LOCATION_PERMISSION_GRANTED });
    setIsGeocoding(true);
    const label = (await getLocationLabel(location)) ?? t('on-boarding.play-area.my_location');
    setIsGeocoding(false);

    setPlayArea({ description: '', isCurrentLocation: true, label, ...location });
    toast({ message: t('on-boarding.play-area.location_found'), variant: 'success' });
  };

  return { isLocating: isLoading || isGeocoding, locate };
};
