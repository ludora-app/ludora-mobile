import { Avatar } from '@ludo/ui';
import { StrictOmit } from '@chillui/ui';

import { useUserMe } from '@/queries/user-me.query';
import { AvatarProps } from '@/components/ludo-ui/types/avatar.types';

export type AvatarMeProps = StrictOmit<AvatarProps, 'data'>;

export default function AvatarMe(props: AvatarMeProps) {
  const { userMe } = useUserMe();
  const avatarUserData = {
    firstname: userMe.firstname,
    imageUrl: userMe.imageUrl ? { uri: userMe.imageUrl } : undefined,
    lastname: userMe.lastname,
  };
  return <Avatar data={avatarUserData} {...props} />;
}
