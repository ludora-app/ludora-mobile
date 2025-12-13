import { useSessionsFilterStore } from '@/stores/sessions-filter.store';

import { useGetAllSessions } from './useGetAllSessions.query';

export const useGetAllSessionsByFilter = () => {
  const eventFilter = useSessionsFilterStore(state => state.eventFilter);

  const { data, ...rest } = useGetAllSessions({});
  const items = data?.pages[0].data.items ?? [];
  const totalCount = data?.pages[0].data.totalCount ?? 0;

  // Event date filter
  // const minStart: string | null = eventFilter?.date?.startDate
  //   ? formatDateToTimestamp({
  //       date: eventFilter?.date?.startDate,
  //       format: 'YYYY-MM-DD',
  //     }).toISOString()
  //   : null;

  // let maxStart: string | null = eventFilter?.date?.endDate
  //   ? formatDateToTimestamp({
  //       date: eventFilter?.date?.endDate,
  //       format: 'YYYY-MM-DD',
  //     }).toISOString()
  //   : minStart;

  // Vérifie si minStart et maxStart tombent le même jour
  // if (minStart && maxStart && dayjs(minStart).isSame(maxStart, 'day')) {
  //   // Si les deux sont le même jour, définis maxStart à la fin de la journée
  //   maxStart = dayjs(maxStart).endOf('day').toISOString();
  // }

  // return useGetAllSessions({
  //   // ...(!!minStart && { minStart }),
  //   // ...(!!maxStart && { maxStart }),
  //   // ...(!!longitude && { longitude }),
  //   // ...(!!latitude && { latitude }),
  //   // ...(!!maxDistance && { maxDistance }),
  //   // ...(!!search && { search }),
  // });
  return { items, totalCount, ...rest };
};
