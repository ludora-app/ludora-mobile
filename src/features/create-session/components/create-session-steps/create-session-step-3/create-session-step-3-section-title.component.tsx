import { useTranslate } from '@tolgee/react';
import { BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';

type CreateSessionStep3SectionTitleProps = {
  title: string;
  iconName: TIconsAll;
};

export default function CreateSessionStep3SectionTitle(props: CreateSessionStep3SectionTitleProps) {
  const { iconName, title } = props;
  const { t } = useTranslate();
  return (
    <BoxRow className="mb-2 items-center gap-2">
      <Icon name={iconName} color={COLORS.primary} />
      <String>{t(title)}</String>
      <String variant="body-xs" colorVariant="muted">
        {t('common.optional')}
      </String>
    </BoxRow>
  );
}
