import { createElement } from '../render.js';
import { createPointTemplate } from '../template/point-template.js';

export default class PointView {
  constructor({point, offers}) {
    this.point = point;
    this.offers = offers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.offers);
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
