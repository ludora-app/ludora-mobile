import COLORS from '@/constants/colors.contstants';
import { FindOneConversationResponseDataSessionData, SessionData } from '@/api/generated/model';

const TEAM_A = 'A';
const TEAM_B = 'B';

export const getTeamBackgroundColor = (sessionData: SessionData | FindOneConversationResponseDataSessionData) => {
  const { teamLabel } = sessionData || {};
  switch (teamLabel) {
    case TEAM_A:
      return { backgroundColor: COLORS.primary };
    case TEAM_B:
      return { backgroundColor: COLORS.secondary };
    default:
      return { backgroundColor: COLORS.primary };
  }
};

export const getTeamBorderColor = (sessionData: SessionData | FindOneConversationResponseDataSessionData) => {
  const { teamLabel } = sessionData || {};
  switch (teamLabel) {
    case TEAM_A:
      return { borderColor: COLORS.primary };
    case TEAM_B:
      return { borderColor: COLORS.secondary };
    default:
      return { borderColor: COLORS.primary };
  }
};

export const getTeamColor = (sessionData: SessionData | FindOneConversationResponseDataSessionData) => {
  const { teamLabel } = sessionData || {};
  switch (teamLabel) {
    case TEAM_A:
      return COLORS.primary;
    case TEAM_B:
      return COLORS.secondary;
    default:
      return COLORS.primary;
  }
};

export const isTeamLabelA = (sessionData: SessionData | FindOneConversationResponseDataSessionData) => {
  const { teamLabel } = sessionData || {};
  return teamLabel === 'A';
};

export const isTeamLabelB = (sessionData: SessionData | FindOneConversationResponseDataSessionData) => {
  const { teamLabel } = sessionData || {};
  return teamLabel === 'B';
};
