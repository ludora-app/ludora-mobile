import { useSessionPlayersLeaveSession } from '@/api/generated/api/session-players/session-players.api';
import {
  useInvalidateConversationsFindAllByUserUid,
  useInvalidateSessionsFindAllMySessions,
  useInvalidateSessionsFindOne,
  useInvalidateSessionTeamsFindTeamsBySessionUid,
} from '@/api/generated/invalidate-queries';

export const useLeaveSession = (sessionUid: string) => {
  const invalidateConversationsFindAllMe = useInvalidateConversationsFindAllByUserUid();
  const invalidateSessionsFindAllMySessions = useInvalidateSessionsFindAllMySessions();
  const invalideTeamsBySessionId = useInvalidateSessionTeamsFindTeamsBySessionUid();
  const invalidateSessionById = useInvalidateSessionsFindOne();

  const mutate = useSessionPlayersLeaveSession({
    mutation: {
      onSuccess: () => {
        invalidateConversationsFindAllMe();
        invalidateSessionsFindAllMySessions();
        invalidateSessionById(sessionUid);
        invalideTeamsBySessionId(sessionUid);
        invalidateSessionsFindAllMySessions();
      },
    },
  });

  const mutateAsync = () => mutate.mutateAsync({ sessionUid });

  return {
    ...mutate,
    mutateAsync,
  };
};
