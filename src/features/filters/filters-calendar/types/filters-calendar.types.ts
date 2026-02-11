import ROUTES from '@/constants/routes.constants';
import { ReturnStackParamList, RootStackParamList } from '@/types/routes-params.types';

export type FiltersCalendarScreenParams = RootStackParamList[typeof ROUTES.FILTERS.FILTER_CALENDAR];

export type FiltersCalendarReturnParams = ReturnStackParamList[typeof ROUTES.FILTERS.FILTER_CALENDAR];
