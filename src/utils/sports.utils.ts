import { basketballBall, basketPlaceHolder, footballPlaceHolder, padelPlaceHolder, tennisPlaceHolder } from 'assets';

import { SPORT_IMAGES } from '@/constants/session.constants';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';

export const getSportImage = (sport: SessionCollectionItemDtoSport) => SPORT_IMAGES[sport] ?? basketballBall;

export const getSportPlaceHolder = (sport: SessionCollectionItemDtoSport) => {
  switch (sport) {
    case 'BASKETBALL':
      return basketPlaceHolder;
    case 'FOOTBALL':
      return footballPlaceHolder;
    case 'PADDEL':
      return padelPlaceHolder;
    case 'TENNIS':
      return tennisPlaceHolder;
    default:
      return basketPlaceHolder;
  }
};
