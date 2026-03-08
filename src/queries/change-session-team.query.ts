import { useSessionPlayersSwitchTeams } from '@generatedApi/session-players/session-players.api';

import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateSessionsFindOne,
  useInvalidateSessionTeamsFindTeamsBySessionUid,
} from '@/api/generated/invalidate-queries';

export const useChangeSessionTeam = (sessionUid: string) => {
  const invalidateSessionFindOne = useInvalidateSessionsFindOne();
  const invalidateConversationsAll = useInvalidateConversationsFindAllByUserUid();
  const invaliteSessionTeams = useInvalidateSessionTeamsFindTeamsBySessionUid();
  const mutate = useSessionPlayersSwitchTeams({
    mutation: {
      onSuccess: () => {
        invalidateSessionFindOne(sessionUid);
        invalidateConversationsAll();
        invaliteSessionTeams(sessionUid);
      },
    },
  });

  const mutateAsync = (teamUid: string) => mutate.mutateAsync({ sessionUid, teamUid });

  return {
    ...mutate,
    mutateAsync,
  };
};
