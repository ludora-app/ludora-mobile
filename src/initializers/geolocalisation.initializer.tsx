import { useCallback, useEffect } from 'react';

import useGetUserLocation from '@/hooks/user-location.hook';
import { useAnalytics } from '@/hooks/analytics-trackers.hook';

export default function GeolocalisationInitializer() {
  const { trackError } = useAnalytics();
  const { getCurrentLocation } = useGetUserLocation({ type: 'SESSIONS' });

  const getUserLocation = useCallback(async () => {
    try {
      await getCurrentLocation();
    } catch (error) {
      trackError({ error, showToast: false });
    }
  }, [getCurrentLocation, trackError]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return null;
}
