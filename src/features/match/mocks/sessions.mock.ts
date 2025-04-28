import SportsEnum from '@/constants/SPORTS';

const sessionsMock = [
  {
    date: new Date().toISOString(),
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    id: 1,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum.FOOTBALL,
  },
  {
    date: new Date().toISOString(),
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    id: 2,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum.BASKETBALL,
  },
  {
    date: new Date().toISOString(),
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    id: 3,
    maxParticipants: 20,
    participants: 20,
    sport: SportsEnum.VOLLEYBALL,
  },
];

export default sessionsMock;
