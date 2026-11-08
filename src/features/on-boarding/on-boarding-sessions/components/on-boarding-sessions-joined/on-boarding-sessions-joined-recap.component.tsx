import { useTranslate } from '@tolgee/react';

import { getOrganizerName } from '@/utils/sessions.utils';
import { FindOneSessionResponseData } from '@/api/generated/model';
import { SessionCard, SessionCardInfoRow } from '@/components/ui/session-card';

type OnBoardingSessionsJoinedRecapProps = {
  session: FindOneSessionResponseData;
};

export const OnBoardingSessionsJoinedRecap = (props: OnBoardingSessionsJoinedRecapProps) => {
  const { session } = props;
  const { t } = useTranslate();
  const { creator, maxPlayersPerTeam, sessionTeams } = session;

  const joinedTeam = sessionTeams.find(team => team.isJoined);
  const teamLabel =
    maxPlayersPerTeam > 1
      ? t('on-boarding.sessions.joined.team', {
          name: creator ? getOrganizerName(creator) : '',
          team: joinedTeam?.teamLabel ?? '',
        })
      : t('on-boarding.sessions.joined.opponent', { name: creator?.firstname ?? '' });

  return (
    <SessionCard
      item={session}
      variant="suggestion"
      extraInfoRows={
        <SessionCardInfoRow iconName="people-regular" isHighlighted>
          {teamLabel}
        </SessionCardInfoRow>
      }
    />
  );
};
