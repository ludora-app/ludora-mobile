import { basketballBall, basketPlaceHolder, footballPlaceHolder, padelPlaceHolder, tennisPlaceHolder } from 'assets';

import { SPORT_IMAGES } from '@/constants/session.constants';
import { CreateSportPreferenceDataSport, SessionCollectionItemDtoSport } from '@/api/generated/model';

export const getSportImage = (sport: SessionCollectionItemDtoSport) => SPORT_IMAGES[sport] ?? basketballBall;

export const getSportPlaceHolder = (sport: SessionCollectionItemDtoSport) => {
  switch (sport) {
    case CreateSportPreferenceDataSport.BASKETBALL:
      return basketPlaceHolder;
    case CreateSportPreferenceDataSport.FOOTBALL:
      return footballPlaceHolder;
    case CreateSportPreferenceDataSport.PADEL:
      return padelPlaceHolder;
    case CreateSportPreferenceDataSport.TENNIS:
      return tennisPlaceHolder;
    default:
      return basketPlaceHolder;
  }
};
