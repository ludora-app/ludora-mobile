import { IconButton as ChillIconButton } from '@chillui/ui';

import { TIcons } from '@/constants/ICONS';

import { IconButtonProps } from '../../types/icon-button.types';

export default function IconButton(props: IconButtonProps) {
  return <ChillIconButton<TIcons> {...props} />;
}
