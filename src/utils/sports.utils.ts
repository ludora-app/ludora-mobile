import { Sport, SportItem } from '@/types/sports.types';
import { SPORT_ASSETS } from '@/constants/sports.constants';

const getSportAssets = (sport: Sport) => SPORT_ASSETS[sport] ?? SPORT_ASSETS.BASKETBALL;

export const getSportImage = (sport: Sport) => getSportAssets(sport).image;

export const getSportPlaceHolder = (sport: Sport) => getSportAssets(sport).placeholder;

export const getSportGameModes = ({ sport, sports }: { sport?: Sport; sports: SportItem[] }) =>
  sports.find(item => item.code === sport)?.gameModes.map(gameMode => gameMode.code) ?? [];
