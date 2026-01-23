import { cn } from '@chillui/ui';
import React, { useMemo } from 'react';
import { Avatar, AvatarProps } from '@ludo/ui';

import AvatarMe from '@/components/ui/me/avatarMe/avatar-me.component';

type SessionSectionAvatarProps = Partial<AvatarProps> & {
  me?: boolean;
  sideTeam: 'left' | 'right';
};

export default function SessionSectionAvatar(props: SessionSectionAvatarProps) {
  const { className, data, me = false, sideTeam, ...rest } = props;

  const handleBorderColor = useMemo(() => {
    if (!sideTeam) {
      return 'border-muted';
    }
    return sideTeam === 'left' ? 'border-primary' : 'border-secondary';
  }, [sideTeam]);

  const handleColorVariant = useMemo(() => {
    if (!sideTeam) {
      return 'muted';
    }
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);

  console.log('sideTeam', sideTeam);

  return me ? (
    <AvatarMe
      {...rest}
      className={cn(handleBorderColor, className)}
      contentProps={{ colorVariant: handleColorVariant }}
    />
  ) : (
    <Avatar
      data={data}
      {...rest}
      className={cn(handleBorderColor, className)}
      contentProps={{ colorVariant: handleColorVariant }}
    />
  );
}
