import { Avatar as AvatarChillUi, AvatarContent, AvatarImage } from '@chillui/ui';

import { AvatarProps } from '../../types/avatar.types';

export default function Avatar(props: AvatarProps) {
  const { contentProps, data, ...rest } = props;
  const { firstname, imageUrl, lastname } = data || {};

  return (
    <AvatarChillUi {...rest}>
      <AvatarContent firstname={firstname} lastname={lastname} {...contentProps} />
      {imageUrl && imageUrl?.length > 0 && <AvatarImage source={{ uri: imageUrl }} />}
    </AvatarChillUi>
  );
}
