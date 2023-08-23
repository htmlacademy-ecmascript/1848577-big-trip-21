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
    render(
      new PointEditView({
        point: this.#points[0],
        pointDestination: this.#destinationsModel.destination,
        pointOffer: this.#offersModel.offers
      }),
      this.#tripListComponent.template
    );

    render(new SortView(), this.#pointContainer);
    render(this.#tripListComponent, this.#pointContainer);

    if (this.#points.length) {
      this.#points.forEach((point) => {
        render(new PointView({
          point,
          pointDestination: this.#destinationsModel.getById(point.destination),
          pointOffer: this.#offersModel.getByType(point.type)

        }),
        this.#tripListComponent.template
        );
      });

    } else {
      render(new PointListAbsenceView(), this.#pointContainer);
    }
  }
}
