
import { Image } from '@/components/ludo-ui/components/image';

import { cn } from '../../../utils';
import { twStyles } from '../styles/Avatar.styles';
import { AvatarImageProps } from '../../../types/avatar.types';

export default function AvatarImage(props: AvatarImageProps) {
  const { className, ...rest } = props;

  return <Image className={cn(twStyles.avatarImage, className)} {...rest} />;
}
