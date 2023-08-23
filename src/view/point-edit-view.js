import AbstractView from '../framework/view/abstract-view.js';
import { createPointEditTemplate } from '../template/point-edit-template.js';
import { POINT_EMPTY } from '../const.js';

export default class PointEditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffer = null;

  constructor({ point = POINT_EMPTY, pointDestination, pointOffer }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffer = pointOffer;
  }

  get template() {
    return createPointEditTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffer: this.#pointOffer
    });
  }
}
