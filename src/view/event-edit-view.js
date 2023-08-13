import { createElement } from '../render.js';
import { createEventCreatorTemplate } from '../template/event-edit-template.js';

export default class EventEditView {
  getTemplate() {
    return createEventCreatorTemplate();
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
