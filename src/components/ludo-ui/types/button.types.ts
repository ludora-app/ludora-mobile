import {
  ButtonContentProps,
  ButtonTitleProps,
  ButtonProps as ChillUiButtonProps,
  ButtonIconProps,
  TIconName as TIconNameChillUi,
} from '@chillui/ui';

import { TIconName } from '@/constants/ICONS';
import { RouteValues } from '@/constants/ROUTES';

export type ButtonProps = ChillUiButtonProps & {
  redirect?: RouteValues;
  title?: string;
  titleProps?: ButtonTitleProps;
  contentProps?: ButtonContentProps;
  iconProps?: Omit<ButtonIconProps, 'name'> & {
    position?: 'left' | 'right';
    name: TIconNameChillUi | TIconName;
  };
};
