import { useMemo } from 'react';
import { cn } from '@chillui/ui';
import { useTranslate } from '@tolgee/react';
import { BoxRowCenterBetween, Chip } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import COLORS from '@/constants/COLORS';
import ROUTES from '@/constants/routes.constants';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';
import { SessionScreenLocalSearchParams } from '@/features/session/types/session.types';

import SessionSectionHeader from '../session-section-header.component';

export default function SessionSectionTeamsHeader() {
  const { t } = useTranslate();
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const router = useRouter();
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

  const handlePress = () => {
    router.push(ROUTES.SESSION.TEAM_UID(sessionUid));
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
        title={t('common.seeAll')}
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
