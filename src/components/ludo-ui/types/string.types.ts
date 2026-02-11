import { StringProps as StringPropsChillUi } from '@chillui/ui';

import { RouteValues } from '@/constants/routes.constants';

export type StringProps = StringPropsChillUi & {
  redirect?: RouteValues;
  truncate?: boolean;
};
