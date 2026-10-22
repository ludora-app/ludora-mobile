import ROUTES from '@/constants/routes.constants';
import { HourPreferenceData } from '@/api/generated/model';
import { RootStackParamList } from '@/types/routes-params.types';

export type OnBoardingSportFormSheetParams = RootStackParamList[typeof ROUTES.ON_BOARDING.SPORT_FORM_SHEET];

export type OnBoardingAvailability = Pick<HourPreferenceData, 'dayOfWeek' | 'timePeriod'>;
