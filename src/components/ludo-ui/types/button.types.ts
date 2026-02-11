import {
  ButtonContentProps,
  ButtonLoaderProps,
  ButtonTitleProps,
  ButtonProps as ChillUiButtonProps,
} from '@chillui/ui';

import { TIconsAll } from '@/constants/ICONS';
import { RouteValues } from '@/constants/routes.constants';

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
    name: TIconsAll;
  };
  isLoading?: boolean;
  loaderProps?: Omit<ButtonLoaderProps, 'name'>;
};
