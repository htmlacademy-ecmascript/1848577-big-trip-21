import { render } from '../framework/render.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import PointListAbsenceView from '../view/point-list-absence-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType, AvailableSortType } from '../const.js';
import { sort } from '../utils/sort.js';

export default class BigTripPresenter {
  #pointContainer = null;
  #pointsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #points = [];
  #tripListComponent = new TripListView();
  #sortComponent = null;
  #pointListAbsenceComponent = new PointListAbsenceView();
  #pointPresenters = new Map();
  #sourcedPoints = [];
  #currentSortType = SortType.DAY;

  constructor({pointContainer, pointsModel, offersModel, destinationsModel}) {
    this.#pointContainer = pointContainer;
    this.#pointsModel = pointsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#points = [...this.#pointsModel.points];
    this.#sourcedPoints = [...this.#pointsModel.points];
    this.#renderSort();
  }

  init() {
    this.#renderBigTrip();
  }

  #renderBigTrip() {
    render(this.#tripListComponent, this.#pointContainer);
    this.#renderPointListAbsence();
    this.#renderPointList();
  }

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
    this.#sortPoints(this.#currentSortType);
    render(this.#sortComponent, this.#pointContainer);
  }

  #renderPointListAbsence() {
    if (this.#points.length === 0) {
      render(this.#pointListAbsenceComponent, this.#pointContainer);
    }
  }

  #renderPointList() {
    if (this.#points.length) {
      this.#points.forEach((point) => {
        this.#renderPoint(point);
      });
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #sortPoints(sortType) {
    this.#currentSortType = sortType;
    this.#points = sort[this.#currentSortType](this.#points);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
    this.#sourcedPoints = updateItem(this.#sourcedPoints, updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripListContainer: this.#tripListComponent,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }
}
