import AbstractView from '../framework/view/abstract-view.js';
import {createInfoTemplate} from '../template/info-template.js';

export default class InfoView extends AbstractView {
  #userPrice = null;
  #tripTitle = null;
  #tripDuration = null;

  constructor({userPrice, tripTitle, tripDuration}) {
    super();
    this.#tripTitle = tripTitle;
    this.#userPrice = userPrice;
    this.#tripDuration = tripDuration;
  }

  get template() {
    return createInfoTemplate({
      userPrice: this.#userPrice,
      tripTitle: this.#tripTitle,
      tripDuration: this.#tripDuration
    });
  }
}
