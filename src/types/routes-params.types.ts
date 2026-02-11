import ROUTES, { RouteValues } from '@/constants/routes.constants';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';

export type RootStackParamList = {
  [ROUTES.INVITE_PEOPLE.INDEX]: { sessionUid: string };
  [ROUTES.CREATE_SESSION.STEP_2_DURATION_FORM_SHEET]: {
    fieldUid: string;
    slotUid: string;
    startDate: string;
    sport: SessionCollectionItemDtoSport;
    endDate?: string;
  };
  [ROUTES.FILTERS.FILTER]: {
    goBackPath: RouteValues;
    source?: 'filter_fields' | 'filter_sessions_all';
    selectedDayCarouselDate: string;
  };
  [ROUTES.FILTERS.FILTER_CALENDAR]: {
    goBackPath: RouteValues;
    initialDate?: string;
  };
  [ROUTES.FILTERS.FILTER_ADDRESSES]: {
    goBackPath: RouteValues;
  };
  [ROUTES.SESSION.INDEX]: {
    id: string;
  };
  [ROUTES.CHAT_ROOM.INDEX]: {
    name: string;
    imageUrl: string;
  };
  [ROUTES.CREATE_SESSION.STEP_5]: {
    sessionUid: string;
  };
  [ROUTES.IMAGE_PICKER.INDEX]: {
    goBackPath: RouteValues;
  };
};

export type ReturnStackParamList = {
  [ROUTES.FILTERS.FILTER]: {
    selectedFilters: string;
  };
  [ROUTES.FILTERS.FILTER_CALENDAR]: {
    date: string;
  };
  [ROUTES.FILTERS.FILTER_ADDRESSES]: {
    address?: string;
    getUserLocation?: string;
  };
  [ROUTES.IMAGE_PICKER.INDEX]: {
    images: string;
  };
};
