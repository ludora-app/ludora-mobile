import { useSessionTeamsFindTeamsBySessionUid } from '@/api/generated/api/session-teams/session-teams.api';

export const useGetSessionTeams = (id: string) => {
  const { data: teamsData, ...rest } = useSessionTeamsFindTeamsBySessionUid(id, {
    query: {
      enabled: !!id,
    },
  });

  const teams = teamsData?.data?.items;

  return {
    ...rest,
    data: teams,
  };
};
