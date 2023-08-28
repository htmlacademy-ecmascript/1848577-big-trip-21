import AbstractView from '../framework/view/abstract-view';
import { createNewEventButtonTemplate } from '../template/new-event-button-template';

export default class NewEventButtonView extends AbstractView {
  get template() {
    return createNewEventButtonTemplate();
  }
}
