import { createElement } from '../render.js';
import { createPointListAbsenceTemplate } from '../template/point-list-absence-template.js';

export default class PointListAbsenceView {
  constructor({point, offers}) {
    this.point = point;
    this.offers = offers;
  }

  getTemplate() {
    return createPointListAbsenceTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
