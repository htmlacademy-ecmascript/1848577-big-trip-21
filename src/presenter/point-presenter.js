import { render } from '../render.js';
import PointEditView from '../view/point-edit-view.js';
import TripListView from '../view/trip-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import PointListAbsenceView from '../view/point-list-absence-view.js';

export default class PointPresenter {
  tripListComponent = new TripListView();

  constructor({pointContainer, pointsModel, offersModel, destinationsModel}) {
    this.pointContainer = pointContainer;
    this.pointsModel = pointsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.points = [...this.pointsModel.get()];
  }

  init() {
    render(
      new PointEditView({
        point: this.points[0],
        pointDestination: this.destinationsModel.get(),
        pointOffer: this.offersModel.get()
      }),
      this.tripListComponent.getElement()
    );

    render(new SortView(), this.pointContainer);
    render(this.tripListComponent, this.pointContainer);

    if (this.points.length) {
      this.points.forEach((point) => {
        render(new PointView({
          point,
          pointDestination: this.destinationsModel.getById(point.destination),
          pointOffer: this.offersModel.getByType(point.type)

        }),
        this.tripListComponent.getElement()
        );
      });

    } else {
      render(new PointListAbsenceView(), this.pointContainer);
    }
  }
}
