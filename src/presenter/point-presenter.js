import {render, replace, remove} from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import {Mode, UserAction, UpdateType} from '../const.js';
import {isDatesEqual} from '../utils/utils.js';

export default class PointPresenter {
  #tripListContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointEditComponent = null;
  #eventPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;
  #typeOffer = null;

  constructor({tripListContainer, offersModel, destinationsModel, onDataChange, onModeChange}) {
    this.#tripListContainer = tripListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;
    this.#typeOffer = this.#offersModel.getByType(this.#point.type);

    const prevPointEditComponent = this.#pointEditComponent;
    const prevEventPointComponent = this.#eventPointComponent;

    if(this.#offersModel) {
      this.#pointEditComponent = new PointEditView({
        point: this.#point,
        pointDestinations: this.#destinationsModel.destinations,
        pointOffers: this.#offersModel.offers,
        onFormSubmit: this.#handleFormSubmit,
        onCloseClick: this.#handleCloseClick,
        onDeleteClick: this.#handleDeleteClick
      });

      this.#eventPointComponent = new PointView({
        point: this.#point,
        pointDestination: this.#destinationsModel.getById(this.#point.destination),
        pointOffers: this.#getOffers(),
        onOpenClick: this.#handleOpenClick,
        onFavoriteClick: this.#handleFavoriteClick
      });
    }

    if (prevPointEditComponent === null || prevEventPointComponent === null) {
      render(this.#eventPointComponent, this.#tripListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventPointComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#resetPoint();
    }
  }

  #resetPoint() {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToItem();
  }

  destroy() {
    remove(this.#pointEditComponent);
    remove(this.#eventPointComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#resetPoint();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceItemToForm() {
    replace(this.#pointEditComponent, this.#eventPointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToItem() {
    replace(this.#eventPointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, update.dateFrom) ||
      !isDatesEqual(this.#point.dateTo, update.dateTo) ||
      !isDatesEqual(this.#point.basePrice, update.basePrice);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
  };

  setSaving() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventPointComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#pointEditComponent.shake(resetFormState);
  }

  #getOffers = () => {
    const offers = [];

    if (this.#point.offers.length) {
      this.#point.offers.forEach((currentOffer) => {
        const itemOffer = this.#typeOffer.offers.find((item) => item.id === currentOffer);
        offers.push(itemOffer);
      });
    }

    return offers;
  };

  #handleCloseClick = () => {
    this.#resetPoint();
  };

  #handleDeleteClick = (point) => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleOpenClick = () => {
    this.#replaceItemToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite
      });
  };
}
