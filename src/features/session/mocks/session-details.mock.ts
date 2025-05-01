import { GameModesEnum, SportsEnum } from '@/constants/SPORTS';

const sessionDetailsMock = [
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldLocation: { address: '40 rue Émile Lepeu, 75011 Paris', latitude: 48.8546, longitude: 2.3923 },
    fieldName: 'Terrain de football du TEP Émile Lepeu',
    fieldPrice: 10,
    gameMode: GameModesEnum.ELEVEN_VS_ELEVEN,
    id: 1,
    maxParticipants: 22,
    participants: 10,
    sport: SportsEnum.FOOTBALL,
    startDate: new Date().toISOString(),
    teams: [
      {
        id: 1,
        maxPlayerCount: 11,
        name: 'A',
        players: [
          {
            id: 100,
            name: 'John Doe',
          },
          {
            id: 101,
            name: 'Jane Doe',
          },
          {
            id: 102,
            name: 'Charles Xavier',
          },
          {
            id: 103,
            name: 'Martian Manhunter',
          },
          {
            id: 104,
            name: 'Bruce Wayne',
          },
        ],
        playersCount: 5,
      },
      {
        id: 2,
        maxPlayerCount: 11,
        name: 'B',
        players: [
          {
            id: 200,
            name: 'Mr Anderson',
          },
          {
            id: 201,
            name: 'Agent Smith',
          },
          {
            id: 202,
            name: 'Yuji Itadori',
          },
          {
            id: 203,
            name: 'Ryomen Sukuna',
          },
          {
            id: 204,
            name: 'Satoru Gojo',
          },
        ],
        playersCount: 5,
      },
    ],
  },
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldLocation: { address: '68 avenue Philippe-Auguste, 75011 Paris', latitude: 48.8575, longitude: 2.3981 },
    fieldName: 'Terrain de basket-ball du Centre Sportif Philippe Auguste',
    fieldPrice: 10,
    gameMode: GameModesEnum.FIVE_VS_FIVE,
    id: 2,
    maxParticipants: 10,
    participants: 6,
    sport: SportsEnum.BASKETBALL,
    startDate: new Date().toISOString(),
    teams: [
      {
        id: 3,
        maxPlayerCount: 5,
        name: 'A',
        players: [
          {
            id: 300,
            name: 'Peter Parker',
          },
          {
            id: 301,
            name: 'Kraven',
          },
          {
            id: 302,
            name: 'Miles Morales',
          },
        ],
        playersCount: 3,
      },
      {
        id: 4,
        maxPlayerCount: 5,
        name: 'B',
        players: [
          {
            id: 400,
            name: 'Curt Connors',
          },
          {
            id: 401,
            name: 'Norman Osborn',
          },
          {
            id: 402,
            name: 'Gwen Stacy',
          },
        ],
        playersCount: 3,
      },
    ],
  },
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldLocation: { address: '10 rue des Vignoles, 75020 Paris', latitude: 48.8585, longitude: 2.4042 },
    fieldName: 'Gymnase des Vignoles',
    fieldPrice: 10,
    gameMode: GameModesEnum.SIX_VS_SIX,
    id: 3,
    maxParticipants: 12,
    participants: 6,
    sport: SportsEnum.VOLLEYBALL,
    startDate: new Date().toISOString(),
    teams: [
      {
        id: 5,
        maxPlayerCount: 6,
        name: 'A',
        players: [
          {
            id: 500,
            name: 'Bruce Wayne',
          },
          {
            id: 501,
            name: 'Dick Grayson',
          },
          {
            id: 502,
            name: 'Jason Todd',
          },
        ],
        playersCount: 3,
      },
      {
        id: 6,
        maxPlayerCount: 6,
        name: 'B',
        players: [
          {
            id: 600,
            name: 'Hugo Strange',
          },
          {
            id: 601,
            name: 'Bane',
          },
          {
            id: 602,
            name: 'Harley Quinn',
          },
        ],
        playersCount: 3,
      },
    ],
  },
  {
    endDate: new Date(new Date('2025-04-28T10:00:00.000Z').getTime() + 60 * 60 * 1000).toISOString(),
    fieldLocation: { address: '12 rue du 20eme Csm Xxe, 75011 Paris', latitude: 48.8575, longitude: 2.3981 },
    fieldName: 'Club Sportif Multisport du 20eme Csm Xxe',
    fieldPrice: 10,
    gameMode: GameModesEnum.ELEVEN_VS_ELEVEN,
    id: 4,
    maxParticipants: 22,
    participants: 10,
    sport: SportsEnum.FOOTBALL,
    startDate: new Date('2025-04-28T10:00:00.000Z').toISOString(),
    teams: [
      {
        id: 7,
        maxPlayerCount: 11,
        name: 'A',
        players: [
          {
            id: 700,
            name: 'Barry Allen',
          },
          {
            id: 701,
            name: 'Wally West',
          },
          {
            id: 702,
            name: 'Bart Allen',
          },
          {
            id: 703,
            name: 'Iris West',
          },
          {
            id: 703,
            name: 'Jay Garrick',
          },
        ],
        playersCount: 5,
      },
      {
        id: 8,
        maxPlayerCount: 11,
        name: 'B',
        players: [
          {
            id: 800,
            name: 'Gorilla Grodd',
          },
          {
            id: 801,
            name: 'Reverse Flash',
          },
          {
            id: 802,
            name: 'Captain Cold',
          },
          {
            id: 803,
            name: 'Kid Flash',
          },
          {
            id: 803,
            name: 'Savitar',
          },
        ],
        playersCount: 3,
      },
    ],
  },
  {
    endDate: new Date(new Date('2025-04-02T10:00:00.000Z').getTime() + 60 * 60 * 1000).toISOString(),
    fieldLocation: { address: '32 rue du Général Archinard, 75020 Paris', latitude: 48.8648, longitude: 2.4135 },
    fieldName: 'Stade Déjerine',
    fieldPrice: 10,
    gameMode: GameModesEnum.TWO_VS_TWO,
    id: 5,
    maxParticipants: 4,
    participants: 3,
    sport: SportsEnum.TENNIS,
    startDate: new Date('2025-04-02T10:00:00.000Z').toISOString(),
    teams: [
      {
        id: 9,
        maxPlayerCount: 2,
        name: 'A',
        players: [
          {
            id: 900,
            name: 'Levi Ackerman',
          },
        ],
        playersCount: 1,
      },
      {
        id: 10,
        maxPlayerCount: 2,
        name: 'B',
        players: [
          {
            id: 1000,
            name: 'Eren Yeager',
          },
          {
            id: 1001,
            name: 'Mikasa Ackerman',
          },
        ],
        playersCount: 2,
      },
    ],
  },
  {
    endDate: new Date('2024-11-18T11:30:00.000Z').toISOString(),
    fieldLocation: { address: '10 rue des Vignoles, 75020 Paris', latitude: 48.8585, longitude: 2.4042 },
    fieldName: 'Gymnase des Vignoles',
    fieldPrice: 10,
    gameMode: GameModesEnum.SIX_VS_SIX,
    id: 6,
    maxParticipants: 12,
    participants: 10,
    sport: SportsEnum.VOLLEYBALL,
    startDate: new Date('2024-11-18T10:00:00.000Z').toISOString(),
    teams: [
      {
        id: 11,
        maxPlayerCount: 6,
        name: 'A',
        players: [
          {
            id: 1100,
            name: 'Trinity',
          },
          {
            id: 1101,
            name: 'Morpheus',
          },
          {
            id: 1102,
            name: 'Jack Sparrow',
          },
          {
            id: 1103,
            name: 'Will Turner',
          },
          {
            id: 1104,
            name: 'Elizabeth Swann',
          },
          {
            id: 1105,
            name: 'Davy Jones',
          },
        ],
        playersCount: 6,
      },
      {
        id: 12,
        maxPlayerCount: 6,
        name: 'B',
        players: [
          {
            id: 1200,
            name: 'Agent Smith',
          },
          {
            id: 1201,
            name: 'Neo',
          },
          {
            id: 1202,
            name: 'Ghengis Khan',
          },
          {
            id: 1203,
            name: 'Napoleon Bonaparte',
          },
        ],
        playersCount: 4,
      },
    ],
  },
];

export default sessionDetailsMock;
