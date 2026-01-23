import { useMemo } from 'react';
import { useTranslate } from '@tolgee/react';
import { Box, BoxGrow, BoxRow, BoxRowGrow, IconButton, String } from '@ludo/ui';

import COLORS from '@/constants/COLORS';
import { FindOneSessionResponseData } from '@/api/generated/model';
import { useSessionTeamStore } from '@/features/session/stores/session-team.store';

import SessionSectionAvatar from '../session-section-avatar.component';
import SessionSectionWrapperItem from '../section-section-wrapper/session-section-wrapper-item.component';

type SessionSectionCreatorCardProps = {
  creator: FindOneSessionResponseData['creator'];
};

export default function SessionSectionCreatorCard(props: SessionSectionCreatorCardProps) {
  const { t } = useTranslate();
  const { creator } = props;
  const { firstname, sessionsCount } = creator || {};
  const sideTeam = useSessionTeamStore(state => state.sideTeam);

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

  return (
    <SessionSectionWrapperItem className="flex-row items-center justify-between">
      <BoxRowGrow className="items-center gap-2">
        <SessionSectionAvatar data={creator} sideTeam={sideTeam} />
        <BoxGrow>
          <String font="primaryBold" truncate>
            {firstname}
          </String>
          <String variant="body-sm">{t('session.creator-section.sessions_count', { count: sessionsCount })}</String>
        </BoxGrow>
      </BoxRowGrow>
      <IconButton
        iconName="chatbot-regular"
        variant="outlined"
        iconColor={handleIconColor}
        colorVariant={handleColorVariant}
        rounded="circle"
      />
    </SessionSectionWrapperItem>
  );
}
