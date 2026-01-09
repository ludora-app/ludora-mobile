import { PropsWithChildren } from 'react';
import { Badge as BadgeChillUi, BadgeContent, BadgeTitle } from '@chillui/ui';

import { BadgeProps } from '../../types/badge.types';

export default function Badge(props: PropsWithChildren<BadgeProps>) {
  const { badgeContentProps, badgeTitleProps, children, show, title, ...rest } = props;
  return (
    <BadgeChillUi {...rest}>
      {show && (
        <BadgeContent {...badgeContentProps}>
          <BadgeTitle {...badgeTitleProps} font="primaryBold">
            {title}
          </BadgeTitle>
        </BadgeContent>
      )}
      {children}
    </BadgeChillUi>
  );
}
