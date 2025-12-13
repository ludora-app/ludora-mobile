import { PropsWithChildren, ReactNode } from 'react';
import { PressableAndroidRippleConfig } from 'react-native';

import { TIcons } from '@/constants/ICONS';

export type CommonProps = PropsWithChildren<{
  androidRipple?: PressableAndroidRippleConfig;
  rightIcon?: keyof TIcons | ReactNode;
  subTitleClassName?: string;
  headerClassName?: string;
  titleContainerClassName?: string;
  itemContainerClassName?: string;
  contentContainerClassName?: string;
  contentWrapperClassName?: string;
  containerClassName?: string;
  titleClassName?: string;
}>;

export type AccordionItemProps = CommonProps & {
  title: string | ReactNode;
  subTitle?: string | ReactNode;
  header?: ReactNode;
  index?: number;
  leftIcon?: keyof TIcons | ReactNode;
  titleClassname?: string;
};

export type AccordionProps = CommonProps & {
  animationDuration?: number;
  compact?: boolean;
};
