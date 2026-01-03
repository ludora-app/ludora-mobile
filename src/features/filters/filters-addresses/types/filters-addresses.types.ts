import { RouteValues } from '@/constants/ROUTES';

export type FiltersAddressesScreenParams = {
  GoBackPath: RouteValues;
};

export type FiltersAddressesReturnParams = {
  address?: string;
  getUserLocation?: string;
};
