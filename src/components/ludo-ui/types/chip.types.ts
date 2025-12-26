import { ChipContentProps, ChipTitleProps, ChipProps as ChillUiChipProps, ChipIconProps } from '@chillui/ui';

import { TIconsAll } from '@/constants/ICONS';
import { RouteValues } from '@/constants/ROUTES';

export type ChipProps = ChillUiChipProps & {
  redirect?: RouteValues;
  image?: {
    source: string;
    contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    className?: string;
  };
  title?: string;
  titleProps?: ChipTitleProps;
  contentProps?: ChipContentProps;
  iconProps?: Omit<ChipIconProps, 'name'> & {
    position?: 'left' | 'right';
    name: TIconsAll;
  };
  isLoading?: boolean;
};
