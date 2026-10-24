import { PropsWithChildren } from 'react';
import { BoxRow, Icon, String } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';
import { TIconsAll } from '@/constants/icons.constants';

type SessionCardInfoRowProps = {
  iconName: TIconsAll;
  isHighlighted?: boolean;
};

export const SessionCardInfoRow = (props: PropsWithChildren<SessionCardInfoRowProps>) => {
  const { children, iconName, isHighlighted = false } = props;

  if (isHighlighted) {
    return (
      <BoxRow className="items-center gap-2.5">
        <Icon name={iconName} color={COLORS.primary} size="sm" />
        <String variant="body-sm" font="primarySemiBold" className="flex-1" truncate>
          {children}
        </String>
      </BoxRow>
    );
  }

  return (
    <BoxRow className="h-5 items-center gap-1.5">
      <Icon name={iconName} color={COLORS.muted} size="xs" />
      <String variant="body-sm" colorVariant="muted" className="flex-1" truncate>
        {children}
      </String>
    </BoxRow>
  );
};
