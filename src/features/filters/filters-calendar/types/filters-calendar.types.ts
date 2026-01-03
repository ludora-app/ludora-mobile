import { RouteValues } from '@/constants/ROUTES';

export type FiltersCalendarScreenParams = {
  GoBackPath: RouteValues;
  initialDate?: string;
};

export type FiltersCalendarReturnParams = {
  date?: string;
};
