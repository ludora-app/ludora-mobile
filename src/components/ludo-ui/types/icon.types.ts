import type { IconProps as IconPropsChillUi, TIconName as TIconNameChillUi } from '@chillui/ui';

import type { TIconName } from '@/constants/icons.constants';

export type IconProps = Omit<IconPropsChillUi, 'name'> & {
  name: TIconName | TIconNameChillUi;
};
