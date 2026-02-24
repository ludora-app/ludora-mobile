import { JoinSessionDto } from '@/api/generated/model';
import { useSessionPlayersJoinSession } from '@/api/generated/api/session-players/session-players.api';
import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateSessionsFindAllMySessions,
  useInvalidateSessionsFindOne,
  useInvalidateSessionTeamsFindTeamsBySessionUid,
} from '@/api/generated/invalidate-queries';

export const useJoinSession = (sessionUid: JoinSessionDto['sessionUid']) => {
  const invalideSessionById = useInvalidateSessionsFindOne();
  const invalideTeamsBySessionId = useInvalidateSessionTeamsFindTeamsBySessionUid();
  const invalidateSessionsFindAllMySessions = useInvalidateSessionsFindAllMySessions();
  const invalidateConversationsFindAllMe = useInvalidateConversationsFindAllByUserUid();
  const mutation = useSessionPlayersJoinSession({
    mutation: {
      onSuccess: () => {
        invalideSessionById(sessionUid);
        invalideTeamsBySessionId(sessionUid);
        invalidateSessionsFindAllMySessions();
        invalidateConversationsFindAllMe();
      },
    },
  });

  const mutateAsync = async (data: JoinSessionDto['teamUid']) =>
    mutation.mutateAsync({ data: { sessionUid, teamUid: data } });
  const mutate = async (data: JoinSessionDto['teamUid']) => mutation.mutate({ data: { sessionUid, teamUid: data } });

  return {
    ...mutation,
    mutate,
    mutateAsync,
  };
};
