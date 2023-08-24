import { getRandomInteger, getRandomArrayElement } from '../utils/common.js';
import { getDate } from '../utils/utils.js';
import { FAVORITE } from '../const.js';

const generateMockPoints = (type, destinationId, offerIds) => ({
  id: crypto.randomUUID(),
  basePrice: getRandomInteger(1, 10000),
  dateFrom: getDate({next:false}),
  dateTo: getDate({next:true}),
  destination: destinationId,
  isFavorite: getRandomArrayElement(FAVORITE),
  offers: offerIds,
  type
});

export{generateMockPoints};
