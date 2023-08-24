import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/point-edit-view.js';
import TripListView from '../view/trip-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import PointListAbsenceView from '../view/point-list-absence-view.js';

export default class PointPresenter {
  #pointContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];
  #tripListComponent = new TripListView();

  constructor({pointContainer, pointsModel, offersModel, destinationsModel}) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = [...this.#pointsModel.points];
  }

  init() {
    this.#renderPage();
  }

  #renderPage() {
    render(new SortView(), this.#pointContainer);
    render(this.#tripListComponent, this.#pointContainer);
    this.#renderPointList();
  }

  #renderPointList() {
    if (this.#points.length) {
      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    } else {
      render(new PointListAbsenceView(), this.#pointContainer);
    }
  }

  #renderPoint(point) {
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const pointEditComponent = new PointEditView({
      point,
      pointDestinations: this.#destinationsModel.destinations,
      pointOffers: this.#offersModel.offers,
      onFormSubmit: () => {
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      },
      onCloseButtonClick: () => {
        replaceFormToItem();
        document.removeEventListener('keydown', onEscKeyDown);
      },
      onDeleteButtonClick: () => {
        document.removeEventListener('keydown', onEscKeyDown);
        remove(pointEditComponent);
      },
    });

    const eventPointComponent = new PointView({
      point,
      pointDestination: this.#destinationsModel.getById(point.destination),
      pointOffer: this.#offersModel.getByType(point.type),
      onClick: () => {
        replaceItemToForm();
        document.addEventListener('keydown', onEscKeyDown);
      }
    });

    function replaceItemToForm() {
      replace(pointEditComponent, eventPointComponent);
    }

    function replaceFormToItem() {
      replace(eventPointComponent, pointEditComponent);
    }

    render(eventPointComponent, this.#tripListComponent.element);
  }
}
