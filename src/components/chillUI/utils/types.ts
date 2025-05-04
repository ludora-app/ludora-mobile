import { TIcons } from '@/constants/ICONS';
import { TextProps } from 'react-native-svg';
import { SportsEnum } from '@/constants/SPORTS';
import { VariantProps } from 'tailwind-variants';
import { Edge } from 'react-native-safe-area-context';
import { AnimatedProps } from 'react-native-reanimated';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ViewProps } from 'react-native-svg/lib/typescript/fabric/utils';
import { StyleProp, TextInputProps, TextStyle, TouchableOpacityProps } from 'react-native';
import BottomSheetNative, { BottomSheetProps as BottomSheetPropsNative } from '@gorhom/bottom-sheet';

import backgroundVariants from '../badge/utils/styleVariants';
import { btnVariant, heightVr, positionVr } from '../button/utils/styleVariants';
import { textColorVr, textPositionVr, textSizeVr, textTypeVr } from '../string/utils/styleVariants';

export type IconProps = {
  onPress?: () => void;
  wrapper?: boolean;
  color?: string;
  variant: keyof TIcons;
  className?: string;
};

export interface BtnProps extends TouchableOpacityProps {
  title?: string;
  loading?: boolean;
  redirect?: string;
  disabled?: boolean;
  onPress?: () => void;
  btnClassName?: string;
  textClassName?: string;
  leftIcon?: keyof TIcons;
  textLeftIcon?: React.ReactNode;
  size?: VariantProps<typeof heightVr>['size'];
  textSize?: VariantProps<typeof textSizeVr>['size'];
  variant?: VariantProps<typeof btnVariant>['variant'];
  textWeight?: VariantProps<typeof textTypeVr>['weight'];
  position?: VariantProps<typeof positionVr>['position'];
}

export type AnimatedViewProps = AnimatedProps<ViewProps>;

export interface StringProps extends TextProps {
  className?: string;
  onPress?: () => void;
  useFastText?: boolean;
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  children?: string | React.ReactNode;
  size?: VariantProps<typeof textSizeVr>['size'];
  type?: VariantProps<typeof textTypeVr>['type'];
  weight?: VariantProps<typeof textTypeVr>['weight'];
  variant?: VariantProps<typeof textColorVr>['variant'];
  position?: VariantProps<typeof textPositionVr>['position'];
}

export interface WrapperProps {
  px?: boolean;
  py?: boolean;
  my?: boolean;
  className?: string;
  scrollView?: boolean;
  itemsCenter?: boolean;
  safeAreaView?: boolean;
  justifyBetween?: boolean;
  children: React.ReactNode;
  edges?: Edge[] | undefined;
  nestedScrollEnabled?: boolean;
  height?: 'h-full' | 'h-screen';
  keyboardAvoidingView?: boolean;
  keyboardAwareScrollView?: boolean;
  pt?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export type FormInputProps = Omit<UseControllerProps<FieldValues>, 'defaultValue'> &
  Omit<TextInputProps, 'defaultValue'> & {
    label?: string;
    required?: boolean;
    className?: string;
  };

export type SeparatorProps = {
  title?: string;
  className?: string;
};

export interface BadgeProps {
  className?: string;
  title: SportsEnum | string;
  size?: VariantProps<typeof String>['size'];
  variant?: VariantProps<typeof backgroundVariants>['variant'];
}

export interface TabSwitchProps {
  leftScreenTitle: string;
  rightScreenTitle: string;
  leftRender: React.ReactNode;
  rightRender: React.ReactNode;
  cardDisplay?: {
    leftScreenIcon?: keyof TIcons;
    rightScreenIcon?: keyof TIcons;
  };
}

export interface LoadingIndicatorsProps extends ViewProps {
  size?: number;
  color?: string;
  animating?: boolean;
  hidesWhenStopped?: boolean;
}

export interface AvatarProps {
  className?: string;
  onPress?: () => void;
  userData: {
    firstname: string;
    lastname?: string;
    image_url: string;
  };
}

export type BottomSheetProps = BottomSheetPropsNative & {
  title: string;
  screen?: boolean;
  closeable?: boolean;
  showHeader?: boolean;
  children: React.ReactNode;
  sheetRef?: React.RefObject<BottomSheetNative>;
  scrollView?: boolean;
  footer?: React.ReactNode;
  footerClassName?: string;
};
