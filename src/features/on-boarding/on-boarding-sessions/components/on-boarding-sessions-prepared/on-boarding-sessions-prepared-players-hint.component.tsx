import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Avatar, BoxRow, String } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import { PreparedSessionValues } from '@/utils/prepared-session.utils';
import { useGetCompatiblePlayers } from '@/queries/get-compatible-players.query';

import { useOnBoardingSessionsStore } from '../../../stores/on-boarding-sessions.store';

const AVATARS_COUNT = 2;

type OnBoardingSessionsPreparedPlayersHintProps = {
  fieldUid: string;
  preparedSession: PreparedSessionValues;
};

function getMomentKey(hour: number) {
  if (hour < 12) return 'common.morning';
  if (hour < 17) return 'common.afternoon';
  return 'common.evening';
}

/** How many compatible players are free at the session's time, under the prepared session card. */
export const OnBoardingSessionsPreparedPlayersHint = (props: OnBoardingSessionsPreparedPlayersHintProps) => {
  const { fieldUid, preparedSession } = props;
  const { t } = useTranslate();
  const publishedSessionUid = useOnBoardingSessionsStore(state => state.publishedSessionUid);
  const { players, totalCount } = useGetCompatiblePlayers({
    fieldUid,
    preparedSession,
    sessionUid: publishedSessionUid,
  });

  if (totalCount === 0) return null;

  const startDate = dayjs(preparedSession.startDate);
  const when = `${startDate.format('ddd')} ${t(getMomentKey(startDate.hour())).toLowerCase()}`;

  return (
    <BoxRow className="items-center gap-3 rounded-card bg-primarySoft px-3.5 py-2.5">
      <BoxRow>
        {players.slice(0, AVATARS_COUNT).map(({ firstname, imageUrl, lastname, uid }, index) => (
          <Avatar
            key={uid}
            size="2xs"
            className={cn('size-7.5 border-2 border-primarySoft', { '-ml-2': index > 0 })}
            hasRandomColor
            contentProps={{ font: 'secondaryExtraBold', size: 'xs' }}
            data={{
              firstname: firstname ?? '',
              id: uid,
              imageUrl: imageUrl ? { uri: imageUrl } : undefined,
              lastname: lastname ?? undefined,
            }}
          />
        ))}
      </BoxRow>
      <String variant="body-sm" font="primaryExtraBold" className="flex-1">
        {t('on-boarding.sessions.prepared.players_hint', { count: totalCount, when })}
      </String>
    </BoxRow>
  );
};
