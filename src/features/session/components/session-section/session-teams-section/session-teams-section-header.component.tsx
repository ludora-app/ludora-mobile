import { useTranslate } from '@tolgee/react';
import { BoxRowCenterBetween, Chip } from '@ludo/ui';
import { useLocalSearchParams, useRouter } from 'expo-router';

import COLORS from '@/constants/COLORS';
import ROUTES from '@/constants/ROUTES';
import { SessionScreenLocalSearchParams } from '@/features/session/types/session.types';

import SessionSectionHeader from '../session-section-header';

export default function SessionTeamsSectionHeader() {
  const { t } = useTranslate();
  const { id: sessionUid } = useLocalSearchParams<SessionScreenLocalSearchParams>();
  const router = useRouter();

  const handlePress = () => {
    router.push(ROUTES.SESSION.TEAM_UID(sessionUid));
  };
  return (
    <BoxRowCenterBetween>
      <SessionSectionHeader iconName="people-2-regular" title="common.teams" />
      <Chip
        title={t('common.seeAll')}
        variant="outlined"
        size="2xs"
        className="bg-white px-0"
        contentProps={{
          className: 'px-2',
        }}
        iconProps={{
          className: 'ml-2',
          color: COLORS.primary,
          name: 'arrow-right-regular',
          position: 'right',
        }}
        onPress={handlePress}
      />
    </BoxRowCenterBetween>
  );
}
