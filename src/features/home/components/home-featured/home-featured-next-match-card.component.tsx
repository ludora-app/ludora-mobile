import { Box, String } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { useUserMe } from '@/queries/user-me.query';
import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItemDto } from '@/api/generated/model';
import { useGetSessionById } from '@/queries/get-session-by-id.query';
import { getSessionCapacity, getSessionNumberOfPlayers } from '@/utils/sessions.utils';

type HomeFeaturedNextMatchCardProps = {
  session: SessionCollectionItemDto;
};

/** The player's next match, joined or organised, without any button: the card opens the session. */
export const HomeFeaturedNextMatchCard = (props: HomeFeaturedNextMatchCardProps) => {
  const { session } = props;
  const { t } = useTranslate();
  const { userMe } = useUserMe();
  const isOrganiser = !!userMe?.uid && session.creatorUid === userMe.uid;
  // The joined team is only in the session detail (`isJoined` per team)
  const { data: sessionDetail } = useGetSessionById(isOrganiser ? '' : session.uid);

  const count = getSessionNumberOfPlayers(session);
  const capacity = getSessionCapacity(session);
  const levelLabel =
    Number(session.level) === 0 ? t('session-card.all_levels') : t(`common.session_level_${session.level}`);
  const joinedTeam = sessionDetail?.sessionTeams.find(({ isJoined }) => isJoined);

  if (isOrganiser) {
    return (
      <SessionCard
        item={session}
        subtitle={t('home.next_match.organizer', { level: levelLabel.toLowerCase() })}
        pill={
          <Box className="items-center justify-center rounded-full bg-tertiary px-2.5 py-1">
            <String variant="body-xs" font="primaryExtraBold">{`${count}/${capacity}`}</String>
          </Box>
        }
      />
    );
  }

  return (
    <SessionCard
      item={session}
      // Until the detail is loaded, the usual organiser and level line
      subtitle={joinedTeam ? t('home.next_match.team', { capacity, count, team: joinedTeam.teamName }) : undefined}
      pill={
        <Box className="items-center justify-center rounded-full bg-successSoft px-2.5 py-1">
          <String variant="body-xs" font="primaryExtraBold" className="text-success">
            {t('home.next_match.joined_badge')}
          </String>
        </Box>
      }
    />
  );
};
