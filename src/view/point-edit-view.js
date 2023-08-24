import AbstractView from '../framework/view/abstract-view.js';
import { createPointEditTemplate } from '../template/point-edit-template.js';
import { POINT_EMPTY } from '../const.js';

export default class PointEditView extends AbstractView {
  #point = null;
  #pointDestination = null;
  #pointOffer = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseButtonClick, onDeleteButtonClick }) {
    super();
    this.#point = point;
    this.#pointDestination = pointDestinations;
    this.#pointOffer = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseButtonClick;
    this.#handleDeleteClick = onDeleteButtonClick;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
  }

  get template() {
    return createPointEditTemplate({
      point: this.#point,
      pointDestination: this.#pointDestination,
      pointOffer: this.#pointOffer
    });
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };
}
