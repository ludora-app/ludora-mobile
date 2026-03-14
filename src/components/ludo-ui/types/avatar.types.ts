import { ImageSource } from 'expo-image';
import { AvatarProps as AvatarChillUiProps, AvatarContentProps } from '@chillui/ui';

export type AvatarProps = AvatarChillUiProps & {
  data: {
    firstname: string;
    imageUrl?: ImageSource;
    lastname?: string;
  };
  contentProps?: Partial<AvatarContentProps>;
  colorVariant?: 'primary' | 'secondary';
};
