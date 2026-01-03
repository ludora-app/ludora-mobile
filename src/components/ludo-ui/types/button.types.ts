import {
  ButtonContentProps,
  ButtonTitleProps,
  ButtonProps as ChillUiButtonProps,
  TIconName as TIconNameChillUi,
} from '@chillui/ui';

import { TIconName } from '@/constants/ICONS';
import { RouteValues } from '@/constants/ROUTES';

import { IconProps } from './icon.types';

export type ButtonProps = ChillUiButtonProps & {
  redirect?: RouteValues;
  image?: {
    source: string;
    contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    className?: string;
  };
  title?: string;
  titleProps?: ButtonTitleProps;
  contentProps?: ButtonContentProps;
  iconProps?: Omit<IconProps, 'name'> & {
    position?: 'left' | 'right' | 'left-outside' | 'right-outside';
    name: TIconNameChillUi | TIconName;
  };
  isLoading?: boolean;
};
