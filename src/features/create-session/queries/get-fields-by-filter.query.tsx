import { useShallow } from 'zustand/react/shallow';

import { useUserLocationStore } from '@/stores/user-geolocalisation.store';

import { useGetFields } from './get-fields.query';
import { useCreateSessionStore } from '../store/create-session.store';

export const useGetAllFieldsByFilter = () => {
  const location = useUserLocationStore(state => state.location);
  const { day, gameMode, sport } = useCreateSessionStore(
    useShallow(state => ({
      day: state.session.day,
      gameMode: state.session.gameMode,
      sport: state.session.sport,
    })),
  );

  const { data, ...rest } = useGetFields({
    date: day,
    gameMode: gameMode ? [gameMode] : [],
    limit: 10,
    sports: sport ? [sport] : [],
    userLat: location?.latitude,
    userLon: location?.longitude,
  });

  const items = data?.pages.flatMap(page => page.data.items) ?? [];
  const totalCount = data?.pages[0]?.data.totalCount ?? 0;

  return { items, totalCount, ...rest };
};
