import { basketballBall, tennisBall, footballBall } from 'assets';

import {
  CreateSessionFromRequestDtoLevel,
  SessionCollectionItemGameMode,
  SessionCollectionItemSport,
} from '@/api/generated/model';

import { TIconsAll } from './ICONS';

export type SESSION_LEVEL_TYPE = {
  code: CreateSessionFromRequestDtoLevel;
  icon: TIconsAll;
  name: string;
};

export const SESSION_LEVELS: SESSION_LEVEL_TYPE[] = [
  {
    code: 1,
    icon: 'mascot-level-easy',
    name: 'EASY',
  },
  {
    code: 2,
    icon: 'mascot-level-medium',
    name: 'MEDIUM',
  },
  {
    code: 3,
    icon: 'mascot-level-hard',
    name: 'HARD',
  },
];

export const GAMEMODES_BY_SPORT = {
  [SessionCollectionItemSport.BASKETBALL]: [
    SessionCollectionItemGameMode.ONE_V_ONE,
    SessionCollectionItemGameMode.THREE_V_THREE,
    SessionCollectionItemGameMode.FIVE_V_FIVE,
  ],
  [SessionCollectionItemSport.FOOTBALL]: [
    SessionCollectionItemGameMode.ONE_V_ONE,
    SessionCollectionItemGameMode.TWO_V_TWO,
    SessionCollectionItemGameMode.FIVE_V_FIVE,
    SessionCollectionItemGameMode.SEVEN_V_SEVEN,
    SessionCollectionItemGameMode.ELEVEN_V_ELEVEN,
  ],
  [SessionCollectionItemSport.PADDEL]: [
    SessionCollectionItemGameMode.ONE_V_ONE,
    SessionCollectionItemGameMode.TWO_V_TWO,
  ],
  [SessionCollectionItemSport.TENNIS]: [
    SessionCollectionItemGameMode.ONE_V_ONE,
    SessionCollectionItemGameMode.TWO_V_TWO,
  ],
};

export const SPORT_IMAGES = {
  [SessionCollectionItemSport.BASKETBALL]: basketballBall,
  [SessionCollectionItemSport.FOOTBALL]: footballBall,
  [SessionCollectionItemSport.PADDEL]: tennisBall,
  [SessionCollectionItemSport.TENNIS]: tennisBall,
} as const;
