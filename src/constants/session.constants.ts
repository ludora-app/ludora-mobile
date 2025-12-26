import { CreateSessionFromRequestDtoLevel } from '@/api/generated/model';

import { TIconsAll } from './ICONS';

export type SESSION_LEVEL_TYPE = {
  code: CreateSessionFromRequestDtoLevel;
  icon: TIconsAll;
  name: string;
};

export const SESSION_LEVELS: SESSION_LEVEL_TYPE[] = [
  {
    code: 0,
    icon: 'mascot-level-easy',
    name: 'easy',
  },
  {
    code: 1,
    icon: 'mascot-level-medium',
    name: 'medium',
  },
  {
    code: 2,
    icon: 'mascot-level-hard',
    name: 'hard',
  },
];

export const GAMEMODES_BY_SPORT = {
  BASKETBALL: ['ONE_V_ONE', 'THREE_V_THREE', 'FIVE_V_FIVE'],
  FOOTBALL: ['ONE_V_ONE', 'TWO_V_TWO', 'FIVE_V_FIVE', 'SEVEN_V_SEVEN', 'ELEVEN_V_ELEVEN'],
  PADDEL: ['ONE_V_ONE', 'TWO_V_TWO'],
  TENNIS: ['ONE_V_ONE', 'TWO_V_TWO'],
};
