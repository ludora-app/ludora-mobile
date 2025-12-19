import { TIconName as TIconNameChillUi, IconButtonProps as IconButtonPropsChillUi } from '@chillui/ui';

import { TIconName } from '@/constants/ICONS';

export type IconButtonProps = Omit<IconButtonPropsChillUi, 'iconName'> & {
  iconName: TIconName | TIconNameChillUi;
};
