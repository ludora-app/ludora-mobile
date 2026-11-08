import {
  tennisBall,
  paddelBall,
  footballBall,
  basketballBall,
  padelPlaceHolder,
  basketPlaceHolder,
  tennisPlaceHolder,
  footballPlaceHolder,
} from 'assets';

import { Sport, SportItem } from '@/types/sports.types';
import { SessionCollectionItemDtoGameMode as GameMode, SessionsFindAllSportsItem } from '@/api/generated/model';

type SportAssets = {
  image: typeof basketballBall;
  placeholder: typeof basketPlaceHolder;
};

export const SPORTS_MOCK: SportItem[] = [
  {
    code: SessionsFindAllSportsItem.TENNIS,
    gameModes: [
      { code: GameMode.ONE_V_ONE, playersPerTeam: 1 },
      { code: GameMode.TWO_V_TWO, playersPerTeam: 2 },
    ],
    order: 1,
  },
  {
    code: SessionsFindAllSportsItem.FOOTBALL,
    gameModes: [
      { code: GameMode.ONE_V_ONE, playersPerTeam: 1 },
      { code: GameMode.TWO_V_TWO, playersPerTeam: 2 },
      { code: GameMode.FIVE_V_FIVE, playersPerTeam: 5 },
      { code: GameMode.SEVEN_V_SEVEN, playersPerTeam: 7 },
      { code: GameMode.ELEVEN_V_ELEVEN, playersPerTeam: 11 },
    ],
    order: 2,
  },
  {
    code: SessionsFindAllSportsItem.BASKETBALL,
    gameModes: [
      { code: GameMode.ONE_V_ONE, playersPerTeam: 1 },
      { code: GameMode.THREE_V_THREE, playersPerTeam: 3 },
      { code: GameMode.FIVE_V_FIVE, playersPerTeam: 5 },
    ],
    order: 3,
  },
  {
    code: SessionsFindAllSportsItem.PADEL,
    gameModes: [
      { code: GameMode.ONE_V_ONE, playersPerTeam: 1 },
      { code: GameMode.TWO_V_TWO, playersPerTeam: 2 },
    ],
    order: 4,
  },
];

export const SPORT_ASSETS: Record<Sport, SportAssets> = {
  BADMINTON: { image: basketballBall, placeholder: basketPlaceHolder },
  BASKETBALL: { image: basketballBall, placeholder: basketPlaceHolder },
  FOOTBALL: { image: footballBall, placeholder: footballPlaceHolder },
  PADEL: { image: paddelBall, placeholder: padelPlaceHolder },
  'PING-PONG': { image: basketballBall, placeholder: basketPlaceHolder },
  TENNIS: { image: tennisBall, placeholder: tennisPlaceHolder },
  VOLLEYBALL: { image: basketballBall, placeholder: basketPlaceHolder },
};
