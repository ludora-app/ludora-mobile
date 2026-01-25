import { useMemo } from 'react';
import { BoxRow, Chip } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SESSION_LEVELS } from '@/constants/session.constants';
import { FindOneSessionResponseData } from '@/api/generated/model';

import { useSessionTeamStore } from '../../stores/session-team.store';

type SessionSectionTagsProps = {
  session: FindOneSessionResponseData;
};

export default function SessionSectionTags({ session }: SessionSectionTagsProps) {
  const { fieldType, level, sport } = session || {};
  const sideTeam = useSessionTeamStore(state => state.sideTeam);
  const { t } = useTranslate();

  const handleColorVariant = useMemo(() => {
    if (!sideTeam) {
      return 'muted';
    }
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);
  return (
    <BoxRow className="flex-row items-center gap-2">
      <Chip title={t(`common.field_type_${fieldType}`, '')} size="2xs" colorVariant={handleColorVariant} />
      <Chip title={t(`common.session_level_${level}`, '')} size="2xs" colorVariant={handleColorVariant} />
      <Chip title={t(`common.session_sport_${sport}`, '')} size="2xs" colorVariant={handleColorVariant} />
    </BoxRow>
  );
}
