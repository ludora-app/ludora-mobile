import { formatDateShort, formatToHour } from '@/utils/time.utils';
import { CreatorInfoResponseData, FindOneSessionResponseData, SessionCollectionItemDto } from '@/api/generated/model';

type SessionCapacity = Pick<
  FindOneSessionResponseData | SessionCollectionItemDto,
  'maxPlayersPerTeam' | 'sessionTeams' | 'teamsPerGame'
>;

const getCapacity = ({ maxPlayersPerTeam, sessionTeams, teamsPerGame }: SessionCapacity) =>
  maxPlayersPerTeam * (teamsPerGame || sessionTeams.length);

const getNumberOfPlayers = ({ sessionTeams }: SessionCapacity) =>
  sessionTeams.reduce((total, team) => total + team.numberOfPlayers, 0);

export const getRemainingSeats = (session: SessionCapacity) =>
  Math.max(getCapacity(session) - getNumberOfPlayers(session), 0);

/** Share of the seats already taken, between 0 and 1. */
export const getSessionFillRatio = (session: SessionCapacity) => {
  const capacity = getCapacity(session);
  return capacity > 0 ? Math.min(getNumberOfPlayers(session) / capacity, 1) : 0;
};

/** `Samedi 24 oct. · 10:00` */
export const formatSessionStartDate = (startDate: string) =>
  `${formatDateShort({ date: startDate, format: 'dddd D MMM' })} · ${formatToHour({ date: startDate, format: 'HH:mm' })}`;

/** `Samedi 24 oct. · 15:00 – 16:30` */
export const formatSessionDateRange = ({ endDate, startDate }: { endDate: string; startDate: string }) =>
  `${formatSessionStartDate(startDate)} – ${formatToHour({ date: endDate, format: 'HH:mm' })}`;

/** `Léa M.` */
export const getOrganizerName = ({ firstname, lastname }: Pick<CreatorInfoResponseData, 'firstname' | 'lastname'>) =>
  lastname ? `${firstname} ${lastname.charAt(0).toUpperCase()}.` : firstname;
