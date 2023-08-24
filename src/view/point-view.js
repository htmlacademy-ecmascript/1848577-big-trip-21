import AbstractView from '../framework/view/abstract-view.js';
import { createPointTemplate } from '../template/point-template.js';
import { POINT_EMPTY } from '../const.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffer = null;
  #handleClick = null;

  constructor({point = POINT_EMPTY, pointDestination, pointOffer, onClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffer = pointOffer;
    this.#handleClick = onClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffer: this.#pointOffer
    });
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
