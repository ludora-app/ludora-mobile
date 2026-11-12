import { JoinSessionDto } from '@/api/generated/model';
import { useSessionPlayersJoinSession } from '@/api/generated/api/session-players/session-players.api';
import {
  useInvalidateSessionsFindAll,
  useInvalidateSessionsFindOne,
  useInvalidateSessionsGetMyStats,
  useInvalidateSessionsFindRecommended,
  useInvalidateSessionsFindAllMySessions,
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateSessionTeamsFindTeamsBySessionUid,
} from '@/api/generated/invalidate-queries';

export const useJoinSession = (sessionUid: JoinSessionDto['sessionUid']) => {
  const invalidateSessionsGetMyStats = useInvalidateSessionsGetMyStats();
  const invalideSessionById = useInvalidateSessionsFindOne();
  const invalideTeamsBySessionId = useInvalidateSessionTeamsFindTeamsBySessionUid();
  const invalidateSessionsFindAllMySessions = useInvalidateSessionsFindAllMySessions();
  const invalidateConversationsFindAllMe = useInvalidateConversationsFindAllByUserUid();
  const invalidateSessionsFindAll = useInvalidateSessionsFindAll();
  const invalidateSessionsFindRecommended = useInvalidateSessionsFindRecommended();
  const mutation = useSessionPlayersJoinSession({
    mutation: {
      onSuccess: () => {
        invalideSessionById(sessionUid);
        invalideTeamsBySessionId(sessionUid);
        invalidateSessionsFindAllMySessions();
        invalidateConversationsFindAllMe();
        invalidateSessionsGetMyStats();
        // The home list and the recommendations show the seats left and exclude joined sessions
        invalidateSessionsFindAll();
        invalidateSessionsFindRecommended();
      },
    },
  });

  const mutateAsync = async (teamUid?: JoinSessionDto['teamUid']) =>
    mutation.mutateAsync({ data: { sessionUid, teamUid } });
  const mutate = async (teamUid?: JoinSessionDto['teamUid']) => mutation.mutate({ data: { sessionUid, teamUid } });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
