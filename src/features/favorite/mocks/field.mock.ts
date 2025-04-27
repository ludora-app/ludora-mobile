import { SportsEnum } from '@/constants/SPORTS';

const fieldImage = require('@/../assets/images/welcome-screen-image-background.jpg');
// todo: delete the folder when the API is ready
export const fieldMock = [
  {
    id: 1,
    name: 'Field 1',
    image: fieldImage,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    price: 10,
    rating: 4.5,
    reviews: 24,
    isFavorite: true,
    sports: [SportsEnum.FOOTBALL, SportsEnum.BASKETBALL],
  },
  {
    id: 2,
    name: 'Field 2',
    image: fieldImage,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    price: 12,
    rating: 3.9,
    reviews: 245,
    isFavorite: true,
    sports: [SportsEnum.VOLLEYBALL, SportsEnum.TENNIS],
  },
  {
    id: 3,
    name: 'Field 3',
    image: fieldImage,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    price: 15,
    rating: 4.2,
    reviews: 19,
    isFavorite: true,
    sports: [SportsEnum.BASKETBALL],
  },
  {
    id: 4,
    name: 'Field 4',
    image: fieldImage,
    location: 'Paris, 11ème arrondissement, Ile-de-France',
    price: 10,
    rating: 4.5,
    reviews: 100,
    isFavorite: true,
    sports: [SportsEnum.FOOTBALL],
  },
];
