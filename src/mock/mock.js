import { getRandomInteger, humanizeDate, getRandomArrayElement } from '../util';
import { TYPES_OF_POINTS } from '../const';

const CITIES = [
  {
    name: 'Bologna',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    photo: `https://loremflickr.com/248/152?${getRandomInteger(1, 20)}`
  },
  {
    'name': 'Geneva',
    'description': 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'photo': `https://loremflickr.com/248/152?${getRandomInteger(1, 20)}`
  },
  {
    name: 'Amsterdam',
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    photo: `https://loremflickr.com/248/152?${getRandomInteger(1, 20)}`
  },
  {
    name: 'Moscow',
    description: ' Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    photo: `https://loremflickr.com/248/152?${getRandomInteger(1, 20)}`
  }
];
const OFFERS = [
  {
    'type': 'Taxi',
    'offers': [
      {
        'id': 1,
        'title': 'Choose radio',
        'price': 20
      }
    ]
  },
  {
    'type': 'Bus',
    'offers': [
      {
        'id': 1,
        'title': 'window seat',
        'price': 10
      }
    ]
  },
  {
    'type': 'Train',
    'offers': [
      {
        'id': 1,
        'title': 'window seat',
        'price': 15
      }
    ]
  },
  {
    'type': 'Ship',
    'offers': [
      {
        'id': 1,
        'title': 'cold drinks',
        'price': 25
      }
    ]
  },
  {
    'type': 'Drive',
    'offers': [
      {
        'id': 1,
        'title': 'air condition',
        'price': 20
      }
    ]
  },
  {
    'type': 'Flight',
    'offers': [
      {
        'id': 1,
        'title': 'add luggage',
        'price': 50
      }
    ]
  },
  {
    'type': 'Check-in',
    'offers': [
      {
        'id': 1,
        'title': 'meal',
        'price': 30
      }
    ]
  },
  {
    'type': 'Sightseeing',
    'offers': [
      {
        'id': 1,
        'title': 'coffee',
        'price': 5
      }
    ]
  },
  {
    'type': 'Restaurant',
    'offers': [
      {
        'id': 1,
        'title': 'dinner',
        'price': 20
      }
    ]
  },
];

const FAVORITE = [true, false];

const createPoint = () => ({
  id: getRandomInteger(1, 500),
  basePrise: getRandomInteger(200, 5000),
  dateFrom: '10:00',
  dateTo: '11:00',
  destination: getRandomArrayElement(CITIES)['name'],
  isFavorite: FAVORITE[getRandomInteger(0, 1)],
  offers: getRandomArrayElement(OFFERS)['offers'][0]['id'],
  type: getRandomArrayElement(TYPES_OF_POINTS)
});

export { createPoint, OFFERS };
