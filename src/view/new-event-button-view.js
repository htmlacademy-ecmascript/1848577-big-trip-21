import AbstractView from '../framework/view/abstract-view';
import {createNewEventButtonTemplate} from '../template/new-event-button-template';

export default class NewEventButtonView extends AbstractView {
  #handleButtonClick = null;

  constructor({onButtonClick}) {
    super();
    this.#handleButtonClick = onButtonClick;
    this.element.addEventListener('click', this.#buttonClickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}
