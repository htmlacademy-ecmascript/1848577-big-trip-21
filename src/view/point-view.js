import { createElement } from '../render.js';
import { createPointTemplate } from '../template/point-template.js';
import { POINT_EMPTY } from '../const.js';

export default class PointView {
  constructor({point = POINT_EMPTY, pointDestination, pointOffer}) {
    this.point = point;
    this.pointDestination = pointDestination;
    this.pointOffer = pointOffer;
  }

  getTemplate() {
    return createPointTemplate({
      point: this.point,
      pointDestination: this.pointDestination,
      pointOffer: this.pointOffer
    });
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
