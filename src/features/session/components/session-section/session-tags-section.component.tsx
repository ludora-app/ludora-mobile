import { BoxRow, Chip } from '@ludo/ui';
import { useTranslate } from '@tolgee/react';

import { SESSION_LEVELS } from '@/constants/session.constants';
import { FindOneSessionResponseData } from '@/api/generated/model';

type SessionTagsSectionProps = {
  session: FindOneSessionResponseData;
};

export default function SessionTagsSection({ session }: SessionTagsSectionProps) {
  const { fieldType, level, sport } = session || {};
  const { t } = useTranslate();
  return (
    <BoxRow className="flex-row items-center gap-2">
      <Chip title={t(`common.field_type_${fieldType}`)} size="2xs" />
      <Chip title={t(`common.session_level_${SESSION_LEVELS[level]?.name}`)} size="2xs" />
      <Chip title={t(`common.session_sport_${sport}`)} size="2xs" />
    </BoxRow>
  );
}
