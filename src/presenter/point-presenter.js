import { render } from '../render.js';
import EventEditView from '../view/event-edit-view.js';
import EventListView from '../view/event-list-view.js';
import PointView from '../view/point-view.js';
import SortView from '../view/sort-view.js';

export default class PointPresenter {
  eventListView = new EventListView();

  constructor({eventsContainer}) {
    this.eventsContainer = eventsContainer;
  }

  init() {
    render(new SortView(), this.eventsContainer);
    render(this.eventListView, this.eventsContainer);
    render(new EventEditView(), this.eventListView.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.eventListView.getElement());
    }
  }
}
