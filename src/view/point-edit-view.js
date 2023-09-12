import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { createPointEditTemplate } from '../template/point-edit-template.js';
import { POINT_EMPTY } from '../const.js';

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #pointDestinations = null;
  #pointOffer = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;

  constructor({ point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseButtonClick, onDeleteButtonClick }) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#pointDestinations = pointDestinations;
    this.#pointOffer = pointOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseButtonClick;
    this.#handleDeleteClick = onDeleteButtonClick;
    this._restoreHandlers();
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffer: this.#pointOffer
    });
  }

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#inputDestinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#inputPriceChangeHandler);

    const eventTypes = this.element.querySelectorAll('.event__type-input');
    eventTypes.forEach((element) =>
      element.addEventListener('change', this.#typeChangeHandler)
    );

    const eventOffers = this.element.querySelectorAll('.event__offer-checkbox');
    eventOffers.forEach((element) =>
      element.addEventListener('change', this.#offerChangeHandler)
    );
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value, offers: []
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedBoxes = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState(
      {offers: checkedBoxes.map((item) => item.id)}
    );
  };

  #inputDestinationChangeHandler = (evt) => {
    evt.preventDefault();

    const selectedDestination = this.#pointDestinations.find((item) => item.name === evt.target.value);

    if(!selectedDestination) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      destination: selectedDestination.id
    });
  };

  #inputPriceChangeHandler = (evt) => {
    evt.preventDefault();
    const priceValue = evt.target.value;

    if (isNaN(priceValue) || priceValue <= 0 || String(priceValue).includes('.')) {
      evt.target.value = '';
      return;
    }

    this.updateElement({
      basePrice: priceValue,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(PointEditView.parseStateToPoint(this._state));
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleCloseClick();
  };

  #deleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick();
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
