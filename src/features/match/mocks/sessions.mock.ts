import { SportsEnum } from '@/constants/SPORTS';

const upcommingSessionsMock = [
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Terrain de football du TEP Émile Lepeu',
    fieldPrice: 10,
    id: 1,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum?.FOOTBALL,
    startDate: new Date().toISOString(),
  },
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Terrain de basket-ball du Centre Sportif Philippe Auguste',
    fieldPrice: 10,
    id: 2,
    maxParticipants: 10,
    participants: 6,
    sport: SportsEnum?.BASKETBALL,
    startDate: new Date().toISOString(),
  },
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Gymnase des Vignoles',
    fieldPrice: 10,
    id: 3,
    maxParticipants: 12,
    participants: 6,
    sport: SportsEnum?.VOLLEYBALL,
    startDate: new Date().toISOString(),
  },
];

const pastSessionsMock = [
  {
    endDate: new Date(new Date('2025-04-28T10:00:00.000Z').getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Terrain de football du TEP Émile Lepeu',
    fieldPrice: 10,
    id: 4,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum?.FOOTBALL,
    startDate: new Date('2025-04-28T10:00:00.000Z').toISOString(),
  },
  {
    endDate: new Date(new Date('2025-04-02T10:00:00.000Z').getTime() + 60 * 60 * 1000).toISOString(),
    fieldName: 'Stade Déjerine',
    fieldPrice: 10,
    id: 5,
    maxParticipants: 4,
    participants: 3,
    sport: SportsEnum?.TENNIS,
    startDate: new Date('2025-04-02T10:00:00.000Z').toISOString(),
  },
  {
    endDate: new Date('2024-11-18T11:30:00.000Z').toISOString(),
    fieldName: 'Gymnase des Vignoles',
    fieldPrice: 10,
    id: 6,
    maxParticipants: 20,
    participants: 10,
    sport: SportsEnum?.VOLLEYBALL,
    startDate: new Date('2024-11-18T10:00:00.000Z').toISOString(),
  },
];

export { upcommingSessionsMock, pastSessionsMock };
