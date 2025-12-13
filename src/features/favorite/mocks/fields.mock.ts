import { SportsEnum } from '@/constants/SPORTS';
import { basketballStadium, footballStadium, volleyballField } from 'assets';

// todo: delete the folder when the API is ready
const fieldsMock = [
  {
    id: 1,
    image: footballStadium,
    isFavorite: true,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    name: 'Field 1',
    price: 10,
    rating: 4.5,
    reviews: 24,
    sports: [SportsEnum.FOOTBALL, SportsEnum.BASKETBALL],
  },
  {
    id: 2,
    image: volleyballField,
    isFavorite: true,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    name: 'Field 2',
    price: 12,
    rating: 3.9,
    reviews: 245,
    sports: [SportsEnum.VOLLEYBALL, SportsEnum.TENNIS],
  },
  {
    id: 3,
    image: basketballStadium,
    isFavorite: true,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    name: 'Field 3',
    price: 15,
    rating: 4.2,
    reviews: 19,
    sports: [SportsEnum.BASKETBALL],
  },
  {
    id: 4,
    image: footballStadium,
    isFavorite: true,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    name: 'Field 4',
    price: 10,
    rating: 4.5,
    reviews: 100,
    sports: [SportsEnum.FOOTBALL],
  },
];

export default fieldsMock;
