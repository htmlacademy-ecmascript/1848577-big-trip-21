import {createToUpperCase} from '../utils/utils';

const getSortItem = ({type, isChecked, isDisabled}) => `
  <div class="trip-sort__item  trip-sort__item--${type}">
    <input
      id="sort-${type}"
      class="trip-sort__input  visually-hidden"
      type="radio"
      name="trip-sort"
      value="sort-${type}"
      data-sort-type="${type}"
      ${isChecked ? 'checked' : ''}
      ${isDisabled ? 'disabled' : ''}
    >
    <label
      class="trip-sort__btn"
      for="sort-${type}"
    >
    ${createToUpperCase(type)}
    </label>
  </div>
`;

const createSortTemplate = (sortItems) =>
  `
  <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sortItems.map((item) => getSortItem(item)).join('')}
  </form>
  `;

export {createSortTemplate};
