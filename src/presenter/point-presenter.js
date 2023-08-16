import { render } from '../render.js';
import EventEditView from '../view/event-edit-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';
import { OFFERS } from '../mock/mock.js';

export default class PointPresenter {
  eventListView = new EventListView();

  constructor({eventsContainer, pointModel}) {
    this.eventsContainer = eventsContainer;
    this.pointModel = pointModel;
  }

  init() {
    this.listOfPoints = [...this.pointModel.getPoints()];

    render(new SortView(), this.eventsContainer);
    render(this.eventListView, this.eventsContainer);
    render(new EventEditView(), this.eventListView.getElement());

    for (let i = 0; i < this.listOfPoints.length; i++) {
      render(new PointView({point: this.listOfPoints[i], offers: OFFERS}), this.eventListView.getElement());
    }
  }
}
