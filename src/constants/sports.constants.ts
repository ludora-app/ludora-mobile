import { SessionsFindAllSportsItem } from '@/api/generated/model';

export type SportProps = {
  id: number;
  name: SessionsFindAllSportsItem;
};

export const SPORTS: SportProps[] = [
  {
    id: 1,
    name: SessionsFindAllSportsItem.TENNIS,
  },
  {
    id: 2,
    name: SessionsFindAllSportsItem.FOOTBALL,
  },
  {
    id: 3,
    name: SessionsFindAllSportsItem.BASKETBALL,
  },
  {
    id: 4,
    name: SessionsFindAllSportsItem.PADEL,
  },
];
