import AbstractView from '../framework/view/abstract-view.js';
import { createPointTemplate } from '../template/point-template.js';
import { POINT_EMPTY } from '../const.js';

export default class PointView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffer = null;
  #handleOpenClick = null;
  #handleFavoriteClick = null;

  constructor({point = POINT_EMPTY, pointDestination, pointOffer, onOpenClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestination;
    this.#pointOffer = pointOffer;
    this.#handleOpenClick = onOpenClick;
    this.#handleFavoriteClick = onFavoriteClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#openClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createPointTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffer: this.#pointOffer
    });
  }

  #openClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleOpenClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
