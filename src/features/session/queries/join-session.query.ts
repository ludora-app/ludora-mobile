import { JoinSessionDto } from '@/api/generated/model';
import { useSessionPlayersJoinSession } from '@/api/generated/api/session-players/session-players.api';
import {
  useInvalidateSessionsFindAllByUserUid,
  useInvalidateSessionsFindOne,
  useInvalidateSessionTeamsFindTeamsBySessionUid,
} from '@/api/generated/invalidate-queries';

export const useJoinSession = (sessionUid: JoinSessionDto['sessionUid']) => {
  const invalideSessionById = useInvalidateSessionsFindOne(sessionUid);
  const invalideTeamsBySessionId = useInvalidateSessionTeamsFindTeamsBySessionUid(sessionUid);
  const invalidateIncommingSessionMe = useInvalidateSessionsFindAllByUserUid({
    limit: 1,
    scope: 'UPCOMING',
    startDateSortOrder: 'asc',
  });
  const mutation = useSessionPlayersJoinSession({
    mutation: {
      onSuccess: () => {
        invalideSessionById();
        invalideTeamsBySessionId();
        invalidateIncommingSessionMe();
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
