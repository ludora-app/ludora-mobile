import type { CreateSessionDto } from '@/api/generated/model';

import { CreateSessionDtoGameMode } from '@/api/generated/model';

const FIELD_UIDS = [
  'cmiz0177d000w53nu8dinwvux',
  'cmiz0173p000c53nu0220dvik',
  'cmiz0173u000d53nufu4gjcin',
  'cmiz01748000e53nuw79uz8b3',
  'cmiz0174d000f53nume8lmtmt',
  'cmiz0174m000g53nuw6bxksmi',
  'cmiz0174t000h53nuoctm1lpf',
  'cmiz0173a000b53nuxy5jhoqi',
];

const GAME_MODES: (keyof typeof CreateSessionDtoGameMode)[] = [
  'TWO_V_TWO',
  'THREE_V_THREE',
  'FOUR_V_FOUR',
  'FIVE_V_FIVE',
  'ELEVEN_V_ELEVEN',
];

export const generateMockSessions = (count: number = 10, userUid: string = 'test-user'): CreateSessionDto[] => {
  const sessions: CreateSessionDto[] = [];
  console.log('createdSessions', sessions);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < count; i += 1) {
    const daysOffset = i + 1;
    const hour = 10;

    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() + daysOffset);
    startDate.setHours(hour, 0, 0, 0);

    const endDate = new Date(startDate);
    endDate.setHours(hour + 1, 0, 0, 0);

    const fieldUid = FIELD_UIDS[i % FIELD_UIDS.length];
    const gameMode = CreateSessionDtoGameMode[GAME_MODES[i % GAME_MODES.length]];

    sessions.push({
      description: `Test session ${i + 1}`,
      endDate: endDate.toISOString(),
      fieldUid,
      gameMode,
      maxPlayersPerTeam: 5,
      minPlayersPerTeam: 3,
      startDate: startDate.toISOString(),
      teamsPerGame: 2,
      title: `Session ${i + 1}`,
      userUid: 'cmizy1kc00000yxnucbzwuq15',
    });
  }

  return sessions;
};

export const mockSessions = generateMockSessions(10);
