import SportsEnum from '@/constants/SPORTS';

const sessionDetailsMock = [
  {
    endDate: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    fieldLocation: 'Paris, 11ème arrondissement, Ile-de-France',
    fieldName: 'Square Duchêne',
    fieldPrice: 10,
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
];

export default sessionDetailsMock;
