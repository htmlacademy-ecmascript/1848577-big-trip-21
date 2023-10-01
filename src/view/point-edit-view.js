import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {createPointEditTemplate} from '../template/point-edit-template.js';
import {POINT_EMPTY, commonConfig} from '../const.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class PointEditView extends AbstractStatefulView {
  #point = null;
  #pointDestinations = null;
  #pointOffers = null;
  #handleFormSubmit = null;
  #handleCloseClick = null;
  #handleDeleteClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #isNew = false;
  #handleResetClick = null;

  constructor({point = POINT_EMPTY, pointDestinations, pointOffers, onFormSubmit, onCloseClick, onDeleteClick, isNew, onResetClick}) {
    super();
    this._setState(PointEditView.parsePointToState(point));
    this.#pointDestinations = pointDestinations;
    this.#pointOffers = pointOffers;
    this.#isNew = isNew;
    this._restoreHandlers();
    this.#handleFormSubmit = onFormSubmit;
    this.#handleCloseClick = onCloseClick;
    this.#handleDeleteClick = onDeleteClick;
    this.#handleResetClick = onResetClick;
  }

  get template() {
    return createPointEditTemplate({
      point: this._state,
      pointDestinations: this.#pointDestinations,
      pointOffers: this.#pointOffers,
      modeAddForm: this.#isNew
    });
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  reset(point) {
    this.updateElement(PointEditView.parsePointToState(point));
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);

    if (this.#isNew) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#resetClickHandler);
    }

    if (!this.#isNew) {
      this.element.querySelector('.event__reset-btn').addEventListener('click', this.#deleteClickHandler);
      this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeClickHandler);
    }

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

    this.#setDatepicker();
  }

  #setDatepicker() {
    if (this._state.dateFrom && this._state.dateTo) {

      this.#datepickerFrom = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          ...commonConfig,
          defaultDate: this._state.dateFrom,
          locale: {
            firstDayOfWeek: 1,
          },
          maxDate: this._state.dateTo,
          onClose: this.#dateFromCloseHandler
        }
      );

      this.#datepickerTo = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          ...commonConfig,
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onClose: this.#dateToCloseHandler,
        }
      );
    }
  }

  #dateFromCloseHandler = ([userDate]) => {
    this.updateElement({
      dateFrom: userDate,
    });
  };

  #dateToCloseHandler = ([userDate]) => {
    this.updateElement({
      dateTo: userDate,
    });
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();

    this.updateElement({
      type: evt.target.value,
      offers: []
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

    const selectedDestinationId = (selectedDestination)
      ? selectedDestination.id
      : null;

    this.updateElement({
      destination: selectedDestinationId
    });
  };

  #inputPriceChangeHandler = (evt) => {
    evt.preventDefault();
    let priceValue = Number(evt.target.value);

    if (priceValue < 0) {
      priceValue = Math.abs(priceValue);
      evt.target.value = priceValue;
    }

    if(!Number.isInteger(priceValue)) {
      priceValue = Math.trunc(priceValue);
      evt.target.value = priceValue;
    }

    this._setState({
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
    this.#handleDeleteClick(PointEditView.parseStateToPoint(this._state));
  };

  #resetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick();
  };

  static parsePointToState = (point) =>
    ({...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false
    });

  static parseStateToPoint = (state) => {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  };
}
