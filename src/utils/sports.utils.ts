import { basketballBall } from 'assets';

import { SPORT_IMAGES } from '@/constants/session.constants';
import { SessionCollectionItemSport } from '@/api/generated/model';

export const getSportImage = (sport: SessionCollectionItemSport) => SPORT_IMAGES[sport] ?? basketballBall;
