import { TIconName as TIconNameChillUi, IconButtonProps as IconButtonPropsChillUi } from '@chillui/ui';

import { TIconName } from '@/constants/icons.constants';

export type IconButtonProps = Omit<IconButtonPropsChillUi, 'iconName'> & {
  iconName: TIconName | TIconNameChillUi;
};
