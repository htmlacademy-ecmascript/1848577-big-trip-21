import AbstractView from '../framework/view/abstract-view.js';
import {createPointListAbsenceTemplate} from '../template/point-list-absence-template.js';

export default class PointListAbsenceView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createPointListAbsenceTemplate(this.#filterType);
  }
}
