import { useSessionPlayersSwitchTeams } from '@/api/generated/api/session-players/session-players.api';

interface ChangeSessionTeamDto {
  teamUid: string;
  sessionUid: string;
}

export const useLeaveSession = () => {
  const mutate = useSessionPlayersSwitchTeams();

  const mutateAsync = (data: ChangeSessionTeamDto) => mutate.mutateAsync(data);

  return {
    ...mutate,
    mutateAsync,
  };
};
