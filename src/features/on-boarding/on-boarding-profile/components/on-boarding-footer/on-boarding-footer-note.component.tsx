import { useTranslate } from '@tolgee/react';
import { BoxRowCenter, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';

type OnBoardingFooterNoteProps = {
  iconName: TIconsAll;
  labelKey: string;
};

export const OnBoardingFooterNote = (props: OnBoardingFooterNoteProps) => {
  const { iconName, labelKey } = props;
  const { t } = useTranslate();

  return (
    <BoxRowCenter className="gap-1.5">
      <Icon name={iconName} size="xs" color={COLORS.primary} />
      <String variant="body-xs" font="primarySemiBold" colorVariant="muted">
        {t(labelKey)}
      </String>
    </BoxRowCenter>
  );
};
