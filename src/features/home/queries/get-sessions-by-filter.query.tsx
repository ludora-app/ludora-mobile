import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { useGetAllSessions } from './get-sessions.query';
import { useSessionsFilterStore } from '../stores/home-sessions-filters.store';

export const useGetAllSessionsByFilter = () => {
  const sessionFilter = useSessionsFilterStore(state => state.sessionFilter);

  const userLocation = useUserLocationStore(state => state.location);

  const { data, ...rest } = useGetAllSessions({
    ...(sessionFilter?.startDate && { startDate: sessionFilter?.startDate }),
    ...(sessionFilter?.endDate && { endDate: sessionFilter?.endDate }),
    ...(userLocation && {
      userLat: userLocation.latitude,
      userLon: userLocation.longitude,
    }),
  });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { items, totalCount, ...rest };
};
