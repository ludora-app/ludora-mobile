import { Button } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import COLORS from '@/constants/COLORS';
import { useUserMe } from '@/queries/user-me.query';
import { truncateString } from '@/utils/string.utils';
import { SessionCard } from '@/components/ui/session-card';
import { SessionCollectionItem } from '@/api/generated/model';
import Header from '@/components/ui/header/components/header.component';

const mockSession: SessionCollectionItem = {
  creatorUid: 'cmj5pw27v002275ls35a4rnad',
  endDate: '2026-01-22T12:00:00.000Z',
  fieldLatitude: 48.75098440000001,
  fieldLongitude: 2.3718412,
  fieldShortAddress: 'ZI SENIA, 2 rue du Courson, Thiais 94320, France',
  gameMode: 'SIX_V_SIX',
  maxPlayersPerTeam: 5,
  sessionTeams: [
    {
      numberOfPlayers: 0,
      teamName: 'Team B',
    },
    {
      numberOfPlayers: 0,
      teamName: 'Team A',
    },
  ],
  sport: 'FOOTBALL',
  startDate: '2026-01-22T10:00:00.000Z',
  uid: 'cmj5pw29n003u75lsml3fafds',
  userDistance: null,
};

export default function HomeSessionListHeaderTopList() {
  const { t } = useTranslate();
  const { userMe } = useUserMe();
  const hasNewSession = false;

  return (
    <Header
      title={t('home.header.title', { username: truncateString({ maxLength: 8, str: userMe?.firstname ?? '' }) })}
      subTitle={t(hasNewSession ? 'home.header.sub_title_incoming_session' : 'home.header.sub_title')}
      hasNewSession={hasNewSession}
    >
      {hasNewSession && <SessionCard session={mockSession} isNextSession />}
      {!hasNewSession && (
        <Button
          title={t('home.header.button_create_match')}
          colorVariant="inverted"
          as="scale-pressable"
          redirect="/create-session"
          size="md"
          iconProps={{
            color: COLORS.primary,
            name: 'flash-solid',
            size: 'lg',
          }}
          fit
          contentProps={{
            className: 'gap-1',
          }}
        />
      )}
    </Header>
  );
}
