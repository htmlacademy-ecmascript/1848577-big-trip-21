import AbstractView from '../framework/view/abstract-view.js';
import { createPointListAbsenceTemplate } from '../template/point-list-absence-template.js';

export default class PointListAbsenceView extends AbstractView {
  #point = null;
  #offers = null;

  constructor({point, offers}) {
    super();
    this.#point = point;
    this.#offers = offers;
  }

  get template() {
    return createPointListAbsenceTemplate();
  }
}
