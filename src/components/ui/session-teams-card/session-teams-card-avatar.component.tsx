import { useMemo } from 'react';
import { Avatar, AvatarProps } from '@ludo/ui';
import { cn, type AvatarContentProps } from '@chillui/ui';

import AvatarMe from '@/components/ui/me/avatarMe/avatar-me.component';

type SessionTeamsCardAvatarProps = Partial<AvatarProps> & {
  me?: boolean;
  sideTeam?: 'left' | 'right';
};

export default function SessionTeamsCardAvatar(props: SessionTeamsCardAvatarProps) {
  const { className, data, me = false, sideTeam, ...rest } = props;

  const handleBorderColor = useMemo(() => {
    if (!sideTeam) {
      return 'border-muted';
    }
    return sideTeam === 'left' ? 'border-primary' : 'border-secondary';
  }, [sideTeam]);

  const handleColorVariant = useMemo((): AvatarContentProps['colorVariant'] => {
    if (!sideTeam) {
      return 'muted';
    }
    return sideTeam === 'left' ? 'primary' : 'secondary';
  }, [sideTeam]);

  const sharedClassName = cn(handleBorderColor, className);
  const sharedContentProps: Partial<AvatarContentProps> = { colorVariant: handleColorVariant };

  if (me) {
    return <AvatarMe {...rest} className={sharedClassName} contentProps={sharedContentProps} />;
  }
  if (data) {
    return <Avatar data={data} {...rest} className={sharedClassName} contentProps={sharedContentProps} />;
  }
  return null;
}
