import ROUTES from '@/constants/routes.constants';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';

export type FiltersAddressesScreenParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];

export type FiltersAddressesReturnParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];
