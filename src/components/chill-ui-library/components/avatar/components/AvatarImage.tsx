import React from 'react';
import { Image } from 'react-native';

import { cn } from '../../../utils';
import { twStyles } from '../styles/Avatar.styles';
import { AvatarImageProps } from '../../../types/avatar.types';

export default function AvatarImage(props: AvatarImageProps) {
  const { className, ...rest } = props;

  return <Image className={cn(twStyles.avatarImage, className)} {...rest} />;
}
