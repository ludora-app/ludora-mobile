import ROUTES, { RouteValues } from '@/constants/routes.constants';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';

export type RootStackParamList = {
  [ROUTES.INVITE_FRIENDS.INDEX]: { sessionId: string };
  [ROUTES.CREATE_SESSION.STEP_2_DURATION_FORM_SHEET]: {
    fieldUid: string;
    slotUid: string;
    startDate: string;
    sport: SessionCollectionItemDtoSport;
    endDate?: string;
  };
  [ROUTES.FILTERS.FILTER]: {
    goBackPath: RouteValues;
    source?: 'filter_fields' | 'filter_sessions_all' | 'players_suggestions';
    selectedDayCarouselDate: string;
  };
  [ROUTES.FILTERS.FILTER_CALENDAR]: {
    goBackPath: RouteValues;
    initialDate?: string;
  };
  [ROUTES.FILTERS.FILTER_ADDRESSES]: {
    goBackPath: RouteValues;
    showNearMe?: string;
  };
  [ROUTES.SESSION.INDEX]: {
    id: string;
  };
  [ROUTES.CHAT_ROOM.INDEX]: {
    name: string;
    imageUrl: string;
    userUid?: string;
    chatRoomId?: string;
    type?: string;
    sender?: string;
    receiver?: string;
    sessionData?: string;
  };
  [ROUTES.CHAT_ROOM.INFO_PRIVATE]: {
    chatRoomId: string;
    name: string;
    imageUrl: string;
    receiver: string;
  };
  [ROUTES.CHAT_ROOM.INFO_SESSION]: {
    chatRoomId: string;
    name: string;
    imageUrl: string;
    sessionUid?: string;
  };
  [ROUTES.MY_FIELDS.ADD]: {
    sport?: SessionCollectionItemDtoSport;
  };
  [ROUTES.IMAGE_PICKER.INDEX]: {
    goBackPath: RouteValues;
  };
  [ROUTES.CHAT_ROOM.MESSAGE_ACTIONS]: {
    messageId: string;
    chatRoomId: string;
  };
  [ROUTES.SESSION.JOINED]: {
    conversationUid: string;
    name: string;
    imageUrl: string;
    type: string;
  };

  [ROUTES.PROFIL.ACTIONS]: {
    firstname: string;
    lastname: string;
    id?: string;
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
