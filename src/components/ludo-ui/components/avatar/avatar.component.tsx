import {
  Avatar as AvatarChillUi,
  AvatarContent,
  AvatarImage,
  AvatarProps as AvatarChillUiProps,
  AvatarContentProps,
} from '@chillui/ui';

type AvatarProps = AvatarChillUiProps & {
  data: {
    firstname: string;
    imageUrl: string;
    lastname?: string;
  };
  contentProps?: AvatarContentProps;
};

export default function Avatar(props: AvatarProps) {
  const { contentProps, data, ...rest } = props;
  const { firstname, imageUrl, lastname } = data;

  return (
    <AvatarChillUi {...rest}>
      <AvatarContent firstname={firstname} lastname={lastname} {...contentProps} />
      <AvatarImage source={{ uri: imageUrl }} />
    </AvatarChillUi>
  );
}
