import ROUTES from '@/constants/routes.constants';
import { RootStackParamList } from '@/types/routes-params.types';

export type ChatRoomLocalSearchParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.INDEX];

export type ChatRoomMessageActionsLocalSearchParams = RootStackParamList[typeof ROUTES.CHAT_ROOM.MESSAGE_ACTIONS];
