import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import PointView from '../view/point-view.js';
import { Mode } from '../const.js';

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

  constructor({ tripListContainer, offersModel, destinationsModel, onDataChange, onModeChange }) {
    this.#tripListContainer = tripListContainer;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const prevPointEditComponent = this.#pointEditComponent;
    const prevEventPointComponent = this.#eventPointComponent;

    this.#pointEditComponent = new PointEditView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      onFormSubmit: this.#handleFormSubmit,
      onCloseButtonClick: this.#handleCloseClick,
      onDeleteButtonClick: this.#handleDeleteClick
    });

    this.#eventPointComponent = new PointView({
      point: this.#point,
      pointDestination: this.#destinationsModel.getById(this.#point.destination),
      pointOffer: this.#offersModel.getByType(this.#point.type),
      onOpenClick: this.#handleOpenClick,
      onFavoriteClick: this.#handleFavoriteClick
    });

    if (prevPointEditComponent === null || prevEventPointComponent === null) {
      render(this.#eventPointComponent, this.#tripListContainer.element);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventPointComponent, prevEventPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevEventPointComponent);
    remove(prevPointEditComponent);
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToItem();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToItem();
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

  #handleFormSubmit = (point) => {
    this.#replaceFormToItem();
    this.#handleDataChange(point);
  };

  #handleCloseClick = () => {
    this.#replaceFormToItem();
  };

  #handleDeleteClick = () => {
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#pointEditComponent);
  };

  #handleOpenClick = () => {
    this.#replaceItemToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };
}
