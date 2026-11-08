import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { StringProps } from './string.types';

export type CardProps = PropsWithChildren<{
  className?: string;
  isSelected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}>;

export type CardSectionProps = PropsWithChildren<{
  className?: string;
}>;

export type CardTextProps = StringProps;
