import { SportPreferenceResponseDataLevel, SportPreferenceResponseDataSport } from '@/api/generated/model';

export type PlayerSportPreference = {
  level?: SportPreferenceResponseDataLevel;
  sport: SportPreferenceResponseDataSport;
};

export type PlayerMock = {
  commonSports?: SportPreferenceResponseDataSport[];
  isSameCity?: boolean;
  uid: string;
  userAvatar?: string;
  userBio?: string;
  userCity?: string;
  userFirstName: string;
  userLastName: string;
  userSportPreferences?: PlayerSportPreference[];
};

export const playersMock: PlayerMock[] = [
  {
    commonSports: [SportPreferenceResponseDataSport.FOOTBALL],
    isSameCity: true,
    uid: '1',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    userBio: 'Passionné de foot et de basket depuis tout petit !',
    userCity: 'Paris',
    userFirstName: 'Lucas',
    userLastName: 'Martin',
    userSportPreferences: [
      { level: 3, sport: SportPreferenceResponseDataSport.FOOTBALL },
      { level: 2, sport: SportPreferenceResponseDataSport.BASKETBALL },
    ],
  },
  {
    commonSports: [SportPreferenceResponseDataSport.TENNIS, SportPreferenceResponseDataSport.PADDEL],
    uid: '2',
    userAvatar: 'https://i.pravatar.cc/150?img=32',
    userCity: 'Lyon',
    userFirstName: 'Emma',
    userLastName: 'Dupont',
    userSportPreferences: [
      { level: 2, sport: SportPreferenceResponseDataSport.TENNIS },
      { sport: SportPreferenceResponseDataSport.PADDEL },
    ],
  },
  {
    isSameCity: true,
    uid: '3',
    userAvatar: 'https://i.pravatar.cc/150?img=53',
    userBio: 'Joueur de basket le weekend 🏀',
    userFirstName: 'Karim',
    userLastName: 'Benzarti',
    userSportPreferences: [{ level: 1, sport: SportPreferenceResponseDataSport.BASKETBALL }],
  },
  {
    commonSports: [SportPreferenceResponseDataSport.FOOTBALL],
    isSameCity: true,
    uid: '4',
    userAvatar: 'https://i.pravatar.cc/150?img=44',
    userBio: 'Amateur de padel et de foot. On se fait un match ?',
    userCity: 'Bordeaux',
    userFirstName: 'Sofia',
    userLastName: 'Hernandez',
    userSportPreferences: [
      { level: 3, sport: SportPreferenceResponseDataSport.PADDEL },
      { level: 3, sport: SportPreferenceResponseDataSport.FOOTBALL },
    ],
  },
  {
    uid: '5',
    userFirstName: 'Antoine',
    userLastName: 'Leroy',
  },
];
