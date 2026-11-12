import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { Avatar, BoxCenter, BoxRow, String } from '@ludo/ui';

import dayjs from '@/lib/dayjs';
import { PreparedSessionValues } from '@/utils/prepared-session.utils';
import { useGetCompatiblePlayers } from '@/queries/get-compatible-players.query';

import { getTimePeriod } from '../../utils/home-match-reasons.utils';
import { HOME_COMPATIBLE_PLAYERS_AVATARS } from '../../constants/home.constants';

type HomeFeaturedPreparedPlayersHintProps = {
  fieldUid: string;
  preparedSession: PreparedSessionValues;
};

/** "8 joueurs compatibles sont dispos samedi aprèm", with two avatars and the number of the others. */
export const HomeFeaturedPreparedPlayersHint = (props: HomeFeaturedPreparedPlayersHintProps) => {
  const { fieldUid, preparedSession } = props;
  const { t } = useTranslate();
  const { players, totalCount } = useGetCompatiblePlayers({ fieldUid, preparedSession });

  if (totalCount === 0) return null;

  const { startDate } = preparedSession;
  const when = t(`home.featured.reason_slot_${getTimePeriod(startDate)}`, { day: dayjs(startDate).format('dddd') });
  const othersCount = totalCount - Math.min(players.length, HOME_COMPATIBLE_PLAYERS_AVATARS);

  return (
    <BoxRow className="items-center gap-3 rounded-field bg-secondarySoft px-3.5 py-2.5">
      <BoxRow>
        {players.slice(0, HOME_COMPATIBLE_PLAYERS_AVATARS).map(({ firstname, imageUrl, lastname, uid }, index) => (
          <Avatar
            key={uid}
            size="2xs"
            className={cn('size-7.5 border-2 border-secondarySoft', { '-ml-2': index > 0 })}
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
        {othersCount > 0 && (
          <BoxCenter className="-ml-2 size-7.5 rounded-full border-2 border-secondarySoft bg-dark">
            <String variant="body-xs" font="secondaryExtraBold" colorVariant="white">
              {`+${othersCount}`}
            </String>
          </BoxCenter>
        )}
      </BoxRow>
      <String variant="body-sm" font="primaryExtraBold" className="flex-1">
        {t('home.prepared.players_hint', { count: totalCount, when })}
      </String>
    </BoxRow>
  );
};
