import { SportsEnum } from '@/constants/SPORTS';

export const sessionsMock = [
  {
    id: 1,
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    date: new Date().toISOString(),
    participants: 10,
    maxParticipants: 20,
    sport: SportsEnum.FOOTBALL,
  },
  {
    id: 2,
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    date: new Date().toISOString(),
    participants: 10,
    maxParticipants: 20,
    sport: SportsEnum.BASKETBALL,
  },
  {
    id: 3,
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    date: new Date().toISOString(),
    participants: 20,
    maxParticipants: 20,
    sport: SportsEnum.VOLLEYBALL,
  },
];
