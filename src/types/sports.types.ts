import { SessionsFindAllSportsItem, SessionCollectionItemDtoGameMode } from '@/api/generated/model';

export type Sport = SessionsFindAllSportsItem;

export type SportGameMode = {
  code: SessionCollectionItemDtoGameMode;
  playersPerTeam: number;
};

export type SportItem = {
  code: Sport;
  gameModes: SportGameMode[];
  order: number;
};
