import SportsEnum from '@/constants/SPORTS';

const upcommingSessionsMock = [
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    id: 1,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum.FOOTBALL,
    startDate: new Date().toISOString(),
  },
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    id: 2,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum.BASKETBALL,
    startDate: new Date().toISOString(),
  },
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    id: 3,
    maxParticipants: 20,
    participants: 20,
    sport: SportsEnum.VOLLEYBALL,
    startDate: new Date().toISOString(),
  },
];

const pastSessionsMock = [
  {
    endDate: new Date(new Date('2025-04-28T10:00:00.000Z').getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
    id: 1,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum.FOOTBALL,
    startDate: new Date('2025-04-28T10:00:00.000Z').toISOString(),
  },
  {
    endDate: new Date(new Date('2025-04-02T10:00:00.000Z').getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Rolland Garros',
    fieldPrice: 10,
    id: 2,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum.TENNIS,
    startDate: new Date('2025-04-02T10:00:00.000Z').toISOString(),
  },
  {
    endDate: new Date(new Date('2025-04-28T10:00:00.000Z').getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Terrain de la Duchêne',
    fieldPrice: 10,
    id: 3,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum.VOLLEYBALL,
    startDate: new Date('2025-04-28T10:00:00.000Z').toISOString(),
  },
];

export { upcommingSessionsMock, pastSessionsMock };
