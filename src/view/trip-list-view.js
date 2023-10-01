import AbstractView from '../framework/view/abstract-view.js';
import {createTripListTemplate} from '../template/trip-list-template.js';

export default class TripListView extends AbstractView {
  get template() {
    return createTripListTemplate();
  }
}
