import { generateMockPoints } from '../mock/points.js';
import { generateMockDestinations } from '../mock/destinations.js';
import { generateMockOffers } from '../mock/offers.js';
import { TYPEPOINTS, DESTINATIONS_COUNT, POINTS_COUNT, OFFERS_MAX_COUNT } from '../const.js';
import { getRandomInteger, getRandomArrayElement } from '../utils/common';

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor() {
    this.#destinations = this.generateDestination();
    this.#offers = this.generateOffers();
    this.#points = this.generatePoints();
  }

  getDestinations() {
    return this.#destinations;
  }

  getOffers() {
    return this.#offers;
  }

  getPoints() {
    return this.#points;
  }

  generateDestination() {
    return Array.from(
      {length: DESTINATIONS_COUNT},
      () => generateMockDestinations()
    );
  }

  generateOffers() {
    return TYPEPOINTS.map((type) => ({
      type,
      offers: Array.from({length: getRandomInteger(0, OFFERS_MAX_COUNT)}, () => generateMockOffers(type))
    }));
  }

  generatePoints() {
    return Array.from({length: POINTS_COUNT}, () => {
      const type = getRandomArrayElement(TYPEPOINTS);
      const destination = getRandomArrayElement(this.#destinations);

      const hasOffers = getRandomInteger(0, 1);
      const offersByType = this.#offers
        .find((item) => item.type === type);
      const offerIds = (hasOffers)
        ? offersByType.offers
          .slice(0, getRandomInteger(0, 5))
          .map((item) => item.id)
        : [];
      return generateMockPoints(type, destination.id, offerIds);
    });
  }
}
