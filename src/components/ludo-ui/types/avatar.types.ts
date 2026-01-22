import { AvatarProps as AvatarChillUiProps, AvatarContentProps } from '@chillui/ui';

export type AvatarProps = AvatarChillUiProps & {
  data: {
    firstname: string;
    imageUrl: string;
    lastname?: string;
  };
  contentProps?: Partial<AvatarContentProps>;
};
