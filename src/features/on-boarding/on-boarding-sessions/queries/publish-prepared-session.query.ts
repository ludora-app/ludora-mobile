import { useSessionInvitationsCreateMany } from '@generatedApi/session-invitations/session-invitations.api';

import { useCreateSession } from '@/queries/create-session.query';
import { CreateSessionFromRequestDtoVisibility } from '@/api/generated/model';
import {
  useInvalidateSessionsFindOne,
  useInvalidateFriendsFindAllMyFriends,
  useInvalidateSessionInvitationsFindAllBySessionId,
} from '@/api/generated/invalidate-queries';

import { PreparedSessionValues } from '../utils/prepared-session.utils';
import { useOnBoardingSessionsStore } from '../../stores/on-boarding-sessions.store';

/**
 * Publishes the prepared session once (its uid is kept in the store), then sends the invitations.
 */
export const usePublishPreparedSession = () => {
  const { isPending: isCreating, mutateAsync: createSession } = useCreateSession();
  const invalidateSessionsFindOne = useInvalidateSessionsFindOne();
  const invalidateFriendsFindAllMyFriends = useInvalidateFriendsFindAllMyFriends();
  const invalidateSessionInvitations = useInvalidateSessionInvitationsFindAllBySessionId();
  const { isPending: isInviting, mutateAsync: createInvitations } = useSessionInvitationsCreateMany({
    mutation: {
      onSuccess: (_data, { sessionUid }) => {
        invalidateSessionInvitations(sessionUid);
        invalidateSessionsFindOne(sessionUid);
        invalidateFriendsFindAllMyFriends();
      },
    },
  });
  const setPublishedSessionUid = useOnBoardingSessionsStore(state => state.setPublishedSessionUid);

  const publish = async ({ fieldUid, preparedSession }: { fieldUid: string; preparedSession: PreparedSessionValues }) => {
    const { publishedSessionUid } = useOnBoardingSessionsStore.getState();
    if (publishedSessionUid) return publishedSessionUid;

    const { endDate, gameMode, level, sport, startDate } = preparedSession;
    const response = await createSession({
      endDate: endDate.toISOString(),
      fieldUid,
      gameMode,
      level,
      sport,
      startDate: startDate.toISOString(),
      visibility: CreateSessionFromRequestDtoVisibility.PUBLIC,
    });
    const sessionUid = response.data.uid;
    setPublishedSessionUid(sessionUid);
    return sessionUid;
  };

  const invite = async ({ receiverUids, sessionUid }: { receiverUids: string[]; sessionUid: string }) => {
    if (receiverUids.length === 0) return;
    await createInvitations({ data: { receiverUids }, sessionUid });
  };

  return { invite, isPending: isCreating || isInviting, publish };
};
