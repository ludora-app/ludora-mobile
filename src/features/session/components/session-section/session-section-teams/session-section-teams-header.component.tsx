import { useMemo } from 'react';
import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { BoxRowCenterBetween, Chip } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import ROUTES from '@/constants/routes.constants';
import COLORS from '@/constants/colors.contstants';
import { FindOneSessionResponseData } from '@/api/generated/model';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import { SessionScreenLocalSearchParams } from '@/features/session/types/session.types';

import SessionSectionHeader from '../session-section-header.component';

type SessionSectionTeamsHeaderProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionTeamsHeader({ session }: SessionSectionTeamsHeaderProps) {
  const { t } = useTranslate();
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const router = useRouter();
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

  const handlePress = () => {
    router.navigate({
      params: {
        endDate: session.endDate,
      },
      pathname: ROUTES.SESSION.TEAM_UID(sessionUid),
    });
  };

  const handleIconColor = useMemo(() => {
    if (!sideTeam) {
      return COLORS.muted;
    }
    return sideTeam === 'left' ? COLORS.primary : COLORS.secondary;
  }, [sideTeam]);

  const handleColorVariant = useMemo(() => {
    if (!sideTeam) {
      return 'muted';
    }
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);

  const handleVariant = useMemo(() => {
    if (!sideTeam) {
      return 'contained';
    }
    return 'outlined';
  }, [sideTeam]);

  return (
    <BoxRowCenterBetween>
      <SessionSectionHeader iconName="people-2-regular" title="common.teams" />
      <Chip
        title={t('chat-room.info_session_see_members')}
        variant={handleVariant}
        size="2xs"
        className={cn('bg-white px-0', { 'border-muted': handleVariant === 'contained' })}
        contentProps={{
          className: 'px-2',
        }}
        colorVariant={handleColorVariant}
        iconProps={{
          className: 'ml-2',
          color: handleIconColor,
          name: 'arrow-right-regular',
          position: 'right',
        }}
        onPress={handlePress}
      />
    </BoxRowCenterBetween>
  );
}
