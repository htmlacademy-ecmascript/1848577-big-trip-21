import { render, remove } from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import PointListAbsenceView from '../view/point-list-absence-view.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { SortType, AvailableSortType, FilterType, UserAction, UpdateType } from '../const.js';
import { sort } from '../utils/sort.js';
import { filter } from '../utils//filter.js';

export default class BigTripPresenter {
  #pointContainer = null;

  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #filterModel = null;

  #tripListComponent = new TripListView();
  #sortComponent = null;
  #pointListAbsenceComponent = null;

  #newPointPresenter = null;
  #pointPresenters = new Map();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  constructor({pointContainer, pointsModel, offersModel, destinationsModel, filterModel, onNewPointDestroy}) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#filterModel = filterModel;

    this.#newPointPresenter = new NewPointPresenter({
      pointDestinations: destinationsModel,
      pointOffers: offersModel,
      pointListContainer: this.#tripListComponent,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    if (this.#currentSortType) {
      return sort[this.#currentSortType](filteredPoints);
    }
    return filteredPoints;
  }

  init() {
    this.#renderBigTrip();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newPointPresenter.init();
  }

  #renderBigTrip() {
    this.#renderSort();
    render(this.#tripListComponent, this.#pointContainer);
    if (this.points.length === 0) {
      this.#renderPointListAbsence();
    } else {
      this.#renderPointList();
    }
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #renderSort() {
    const sortTypes = Object.values(SortType)
      .map(
        (type) => ({
          type,
          isChecked: (type === this.#currentSortType),
          isDisabled: !AvailableSortType[type]
        }),
      );

    this.#sortComponent = new SortView({
      items: sortTypes,
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#pointContainer);
  }

  #renderPointListAbsence() {
    this.#pointListAbsenceComponent = new PointListAbsenceView({
      filterType: this.#filterType
    });

    render(this.#pointListAbsenceComponent, this.#pointContainer);
  }

  #renderPointList() {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #clearBigTrip({resetSortType = false} = {}) {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#pointListAbsenceComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBigTrip();
        this.#renderBigTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearBigTrip({resetSortType: true});
        this.#renderBigTrip();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearBigTrip();
    this.#renderBigTrip();
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripListContainer: this.#tripListComponent,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
