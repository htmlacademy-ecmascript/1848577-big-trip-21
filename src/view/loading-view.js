import AbstractView from '../framework/view/abstract-view.js';
import {createLoadingTemplate} from '../template/loading-template.js';

export default class LoadingView extends AbstractView {
  #isErrorMessage = false;

  constructor({isErrorMessage}) {
    super();
    this.#isErrorMessage = isErrorMessage;
  }

  get template() {
    return createLoadingTemplate(this.#isErrorMessage);
  }
}
