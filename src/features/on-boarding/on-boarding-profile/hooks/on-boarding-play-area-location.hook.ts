import { useState } from 'react';
import { useToast } from '@chillui/ui';
import * as Location from 'expo-location';
import { useTranslate } from '@tolgee/react';

import useGetUserLocation from '@/hooks/user-location.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';
import { ANALYTICS_EVENTS } from '@/constants/analytics-events.constants';
import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { OnBoardingPlayArea } from '../../types/on-boarding.types';
import { useOnBoardingStore } from '../../stores/on-boarding.store';

async function getLocationLabel(coords: { latitude: number; longitude: number }) {
  try {
    const [address] = await Location.reverseGeocodeAsync(coords);
    return address?.city ?? address?.subregion ?? address?.region ?? null;
  } catch {
    return null;
  }
}

type UseOnBoardingPlayAreaLocationOptions = {
  /** Shows the alert to the settings when the permission is denied. */
  hasDeniedAlert?: boolean;
  /** Receives the play area found. By default, it becomes the on-boarding play area. */
  onLocated?: (playArea: OnBoardingPlayArea) => Promise<void> | void;
};

/**
 * Asks for the location permission and uses the current position as the play area.
 * The label comes from the native reverse geocoding.
 */
export const useOnBoardingPlayAreaLocation = (options: UseOnBoardingPlayAreaLocationOptions = {}) => {
  const { hasDeniedAlert = true, onLocated } = options;
  const { t } = useTranslate();
  const { toast } = useToast();
  const { trackEvent } = useAnalytics();
  const [isGeocoding, setIsGeocoding] = useState(false);
  const setPlayArea = useOnBoardingStore(state => state.setPlayArea);
  const { getCurrentLocation, isLoading } = useGetUserLocation({ showAlert: hasDeniedAlert, type: 'SESSIONS' });

  /** Returns whether the location permission is denied. */
  const locate = async () => {
    const { locationFound } = await getCurrentLocation();
    const { location } = useUserLocationStore.getState();

    if (!locationFound || !location) {
      const { status } = await Location.getForegroundPermissionsAsync();
      const isDenied = status !== Location.PermissionStatus.GRANTED;
      if (isDenied) {
        trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.LOCATION_PERMISSION_DENIED });
      }
      return { isDenied };
    }

    trackEvent({ eventName: ANALYTICS_EVENTS.ONBOARDING.LOCATION_PERMISSION_GRANTED });
    setIsGeocoding(true);
    const label = (await getLocationLabel(location)) ?? t('on-boarding.play-area.my_location');
    const playArea = { description: '', isCurrentLocation: true, label, ...location };

    if (onLocated) {
      await onLocated(playArea);
      setIsGeocoding(false);
      return { isDenied: false };
    }

    setIsGeocoding(false);
    setPlayArea(playArea);
    toast({ message: t('on-boarding.play-area.location_found'), variant: 'success' });
    return { isDenied: false };
  };

  return { isLocating: isLoading || isGeocoding, locate };
};
