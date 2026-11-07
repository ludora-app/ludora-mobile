import { ImageSource } from 'expo-image';
import { AvatarProps as AvatarChillUiProps, AvatarContentProps } from '@chillui/ui';

export type AvatarProps = AvatarChillUiProps & {
  data: {
    /** Seeds the color of `hasRandomColor`; the name is used without it. */
    id?: string;
    firstname: string;
    imageUrl?: ImageSource;
    lastname?: string;
  };
  contentProps?: Partial<AvatarContentProps>;
  colorVariant?: 'primary' | 'secondary';
  /** Without photo: a bright background with white initials, always the same color for a given player. */
  hasRandomColor?: boolean;
};
