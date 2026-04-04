import { FindOneConversationResponseDataSessionData, SessionData } from '@/api/generated/model';
import {
  getTeamBackgroundColor,
  getTeamBorderColor,
  getTeamColor,
  isTeamLabelA,
  isTeamLabelB,
} from '@/utils/session-teams.utils';

export const useSessionTeam = (sessionData?: SessionData | FindOneConversationResponseDataSessionData) => {
  const isTeamA = isTeamLabelA(sessionData);
  const isTeamB = isTeamLabelB(sessionData);
  const backgroundColor = getTeamBackgroundColor(sessionData);
  const borderColor = getTeamBorderColor(sessionData);
  const color = getTeamColor(sessionData);

  return { backgroundColor, borderColor, color, isTeamA, isTeamB };
};
