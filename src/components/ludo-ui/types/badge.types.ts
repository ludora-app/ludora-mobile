import { BadgeProps as BadgePropsChillUi, BadgeContentProps, BadgeTitleProps } from '@chillui/ui';

export type BadgeProps = BadgePropsChillUi & {
  title: string;
  badgeContentProps?: BadgeContentProps;
  badgeTitleProps?: BadgeTitleProps;
  show?: boolean;
};
