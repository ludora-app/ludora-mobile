import { RouteValues } from '@/constants/routes.constants';
import { StringProps as StringPropsChillUi } from '@/components/chill-ui-library/types/string.types';

export type StringProps = StringPropsChillUi & {
  redirect?: RouteValues;
  truncate?: boolean;
};
