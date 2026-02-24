import { basketballBall, tennisBall, footballBall } from 'assets';

import {
  CreateSessionFromRequestDtoLevel,
  SessionCollectionItemDtoGameMode,
  SessionCollectionItemDtoSport,
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
    icon: 'ludo-level-easy',
    name: 'EASY',
  },
  {
    code: 2,
    icon: 'ludo-level-medium',
    name: 'MEDIUM',
  },
  {
    code: 3,
    icon: 'ludo-level-hard',
    name: 'HARD',
  },
];

export const GAMEMODES_BY_SPORT = {
  [SessionCollectionItemDtoSport.BASKETBALL]: [
    SessionCollectionItemDtoGameMode.ONE_V_ONE,
    SessionCollectionItemDtoGameMode.THREE_V_THREE,
    SessionCollectionItemDtoGameMode.FIVE_V_FIVE,
  ],
  [SessionCollectionItemDtoSport.FOOTBALL]: [
    SessionCollectionItemDtoGameMode.ONE_V_ONE,
    SessionCollectionItemDtoGameMode.TWO_V_TWO,
    SessionCollectionItemDtoGameMode.FIVE_V_FIVE,
    SessionCollectionItemDtoGameMode.SEVEN_V_SEVEN,
    SessionCollectionItemDtoGameMode.ELEVEN_V_ELEVEN,
  ],
  [SessionCollectionItemDtoSport.PADDEL]: [
    SessionCollectionItemDtoGameMode.ONE_V_ONE,
    SessionCollectionItemDtoGameMode.TWO_V_TWO,
  ],
  [SessionCollectionItemDtoSport.TENNIS]: [
    SessionCollectionItemDtoGameMode.ONE_V_ONE,
    SessionCollectionItemDtoGameMode.TWO_V_TWO,
  ],
};

export const SPORT_IMAGES = {
  [SessionCollectionItemDtoSport.BASKETBALL]: basketballBall,
  [SessionCollectionItemDtoSport.FOOTBALL]: footballBall,
  [SessionCollectionItemDtoSport.PADDEL]: tennisBall,
  [SessionCollectionItemDtoSport.TENNIS]: tennisBall,
} as const;
