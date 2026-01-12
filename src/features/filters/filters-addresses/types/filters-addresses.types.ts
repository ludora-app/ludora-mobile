import ROUTES from '@/constants/ROUTES';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';

export type FiltersAddressesScreenParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];

export type FiltersAddressesReturnParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER_ADDRESSES];
