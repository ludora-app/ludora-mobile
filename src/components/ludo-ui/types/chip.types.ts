import { ChipContentProps, ChipTitleProps, ChipProps as ChillUiChipProps, ChipIconProps } from '@chillui/ui';

import { TIconsAll } from '@/constants/icons.constants';
import { RouteValues } from '@/constants/routes.constants';

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
  iconProps?: Omit<ChipIconProps, 'name' | 'position'> & {
    position?: 'left' | 'right' | 'left-outside' | 'right-outside';
    name: TIconsAll;
  };
  isLoading?: boolean;
};
