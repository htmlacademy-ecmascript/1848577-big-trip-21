import {FilterType} from '../const';

const PointsListAbsenceTextVariations = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PAST]: 'There are no past events now',
  [FilterType.PRESENT]: 'There are no present events now',
};

const createPointListAbsenceTemplate = (filterType) => {
  const pointListAbsenceText = PointsListAbsenceTextVariations[filterType];

  return `
  <p class="trip-events__msg">
    ${pointListAbsenceText}
  </p>
  `;
};

export {createPointListAbsenceTemplate};
