import { StringProps as StringPropsChillUi } from '@chillui/ui';

import { RouteValues } from '@/constants/ROUTES';

export type StringProps = StringPropsChillUi & {
  redirect?: RouteValues;
  truncate?: boolean;
};
