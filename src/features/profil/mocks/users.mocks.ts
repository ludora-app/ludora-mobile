type User = {
  firstname: string;
  id: number;
  image: string;
  lastname: string;
  message?: string;
};

const users: User[] = [
  {
    firstname: 'John',
    id: 1,
    image: 'https://via.placeholder.com/150',
    lastname: 'Doe',
  },
  {
    firstname: 'Jane',
    id: 2,
    image: 'https://via.placeholder.com/150',
    lastname: 'Doe',
    message: 'Suivi(e) par eoie_e +1 autres personnes',
  },
  {
    firstname: 'John',
    id: 3,
    image: 'https://via.placeholder.com/150',
    lastname: 'Doe',
    message: 'Suivi(e) par eoie_e +1 autres personnes',
  },
  {
    firstname: 'Jane',
    id: 4,
    image: 'https://via.placeholder.com/150',
    lastname: 'Doe',
  },
  {
    firstname: 'John',
    id: 5,
    image: 'https://via.placeholder.com/150',
    lastname: 'Doe',
  },
  {
    firstname: 'Jane',
    id: 6,
    image: 'https://via.placeholder.com/150',
    lastname: 'Doe',
  },
];

export default users;
