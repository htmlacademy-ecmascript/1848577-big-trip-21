import AbstractView from '../framework/view/abstract-view.js';
import {createInfoTemplate} from '../template/info-template.js';

export default class InfoView extends AbstractView {
  #travelPoints = [];
  #isSmallPoints = false;
  #userPrice = null;

  constructor({ travelPoints, isSmallPoints, userPrice }) {
    super();
    this.#travelPoints = travelPoints;
    this.#isSmallPoints = isSmallPoints;
    this.#userPrice = userPrice;
  }

  get template() {
    return createInfoTemplate(this.#travelPoints, this.#isSmallPoints, this.#userPrice);
  }
}
