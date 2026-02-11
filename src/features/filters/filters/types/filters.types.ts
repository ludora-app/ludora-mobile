import ROUTES from '@/constants/routes.constants';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';

export type FiltersScreenParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER];

export type FiltersReturnParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER];

export type FiltersCalendarScreenParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER_CALENDAR];

export type FiltersCalendarReturnParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER_CALENDAR];

export type FiltersAddressesScreenParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];

export type FiltersAddressesReturnParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];
