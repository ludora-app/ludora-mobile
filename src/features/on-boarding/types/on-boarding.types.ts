import ROUTES from '@/constants/routes.constants';
import { RootStackParamList } from '@/types/routes-params.types';
import { HourPreferenceData, UpdatePlayAreaDto } from '@/api/generated/model';

export type OnBoardingSportFormSheetParams = RootStackParamList[typeof ROUTES.ON_BOARDING.SPORT_FORM_SHEET];

export type OnBoardingAvailability = Pick<HourPreferenceData, 'dayOfWeek' | 'timePeriod'>;

// The label is only displayed during the on-boarding: the backend derives the city from the coordinates
export type OnBoardingPlace = Pick<UpdatePlayAreaDto, 'latitude' | 'longitude'> & {
  description: string;
  label: string;
};

export type OnBoardingPlayArea = OnBoardingPlace & {
  isCurrentLocation: boolean;
};
