import { Avatar as AvatarChillUi, AvatarContent, AvatarImage, cn } from '@chillui/ui';

import { AvatarProps } from '../../types/avatar.types';

export default function Avatar(props: AvatarProps) {
  const { className, colorVariant, contentProps, data, ...rest } = props;
  const { firstname, imageUrl, lastname } = data || {};

  return (
    <AvatarChillUi {...rest} className={cn({ "border-secondary": colorVariant === "secondary" }, className)}>
      <AvatarContent firstname={firstname} lastname={lastname} colorVariant={colorVariant} {...contentProps} />
      {imageUrl && imageUrl?.length > 0 && <AvatarImage source={{ uri: imageUrl }} />}
    </AvatarChillUi>
  );
}
