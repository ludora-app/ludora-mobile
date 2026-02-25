import { useMemo } from 'react'
import { Icon, IconProps } from '@ludo/ui';

import COLORS from '@/constants/colors.contstants';


type SessionSectionIconProps = IconProps & {
  sideTeam: 'left' | 'right';
};

export default function SessionSectionIcon(props: SessionSectionIconProps) {
  const { sideTeam, ...rest } = props;

  const handleIconColor = useMemo(() => {
    if (!sideTeam) {
      return COLORS.muted;
    }
    return sideTeam === 'left' ? COLORS.primary : COLORS.secondary;
  }, [sideTeam]);

  return (
    <Icon color={handleIconColor} size="sm" {...rest} />
  )
}