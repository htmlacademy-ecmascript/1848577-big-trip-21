const DESTINATIONS_COUNT = 5;
const POINTS_COUNT = 5;
const OFFERS_MAX_COUNT = 5;
const END_POINT = 'https://21.objects.pages.academy/big-trip';
const AUTHORIZATION = 'Basic Col552YMXy53POYI';

const CITIES = [
  'Bologna',
  'Geneva',
  'Amsterdam',
  'Moscow',
  'London',
  'Rome'
];

const DESCRIPTION_PICTURES = [
  'Lorem ipsum dolor sit amet.',
  'Phasellus eros mauris.',
  'In rutrum ac purus sit amet tempus.'
];

const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'
];

const TYPEPOINTS = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

const DateFormat = {
  FULL_DATA: 'DD/MM/YY HH:mm',
  HOUR_MINUTE: 'HH:mm',
  MONTH_DAY: 'MMM DD',
  DAY_MONTH: 'DD MMM',
  DATE_TIME: 'YYYY-MM-DDTHH:mm'
};

const DEFAULT_TYPE = 'flight';

const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: DEFAULT_TYPE,
};

const Duration = {
  MIN: 59,
  DAY: 7,
  HOUR: 23
};

const FAVORITE = [
  true,
  false
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers'
};

const AvailableSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFERS]: false
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  PLUG: 'PLUG',
};

const commonConfig = {
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  'time_24hr': true,
  allowInput: true
};

const WebsiteAddress = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const DateTime = {
  MSEC_IN_SEC: 1000,
  SEC_IN_MIN: 60,
  MIN_IN_HOUR: 60,
  HOUR_IN_DAY: 24
};

export {TYPEPOINTS, DateFormat, DEFAULT_TYPE, CITIES, DESCRIPTIONS, POINT_EMPTY, DESCRIPTION_PICTURES, Duration, FAVORITE, DESTINATIONS_COUNT, POINTS_COUNT, OFFERS_MAX_COUNT, FilterType, Mode, SortType, AvailableSortType, UserAction, UpdateType, commonConfig, END_POINT, AUTHORIZATION, WebsiteAddress, DateTime};
