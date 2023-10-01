import AbstractView from '../framework/view/abstract-view.js';
import {createSortTemplate} from '../template/sort-template.js';

export default class SortView extends AbstractView {
  #sortItems = [];
  #handleSortTypeChange = null;

  constructor({items, onSortTypeChange}) {
    super();
    this.#sortItems = items;
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sortItems);
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };
}
