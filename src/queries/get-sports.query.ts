import { useQuery } from '@tanstack/react-query';

import { Sport, SportItem } from '@/types/sports.types';
import { getSportGameModes } from '@/utils/sports.utils';
import { SPORTS_MOCK } from '@/constants/sports.constants';
import { useGetMethodErrorTracking } from '@/hooks/analytics-trackers.hook';

const SPORTS_QUERY_KEY = ['sports'];

const MOCK_DELAY_MS = 3_000;

const getSportsMock = async (): Promise<SportItem[]> => {
  await new Promise(resolve => {
    setTimeout(resolve, MOCK_DELAY_MS);
  });
  return SPORTS_MOCK;
};

export const useGetSports = () => {
  const query = useQuery({
    queryFn: getSportsMock,
    queryKey: SPORTS_QUERY_KEY,
    staleTime: Infinity,
  });
  const { error, isError } = query;

  useGetMethodErrorTracking({ error, isError });

  return { ...query, sports: query.data ?? [] };
};

export const useGetSportGameModes = (sport?: Sport) => {
  const { sports } = useGetSports();

  return getSportGameModes({ sport, sports });
};
