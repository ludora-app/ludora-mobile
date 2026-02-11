import { basketballBall } from 'assets';

import { SPORT_IMAGES } from '@/constants/session.constants';
import { SessionCollectionItemDtoSport } from '@/api/generated/model';

export const getSportImage = (sport: SessionCollectionItemDtoSport) => SPORT_IMAGES[sport] ?? basketballBall;
