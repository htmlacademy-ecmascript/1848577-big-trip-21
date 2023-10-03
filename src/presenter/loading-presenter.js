import {render, remove, RenderPosition} from '../framework/render';
import LoadingView from '../view/loading-view.js';

export default class LoadingPresenter {
  #loadingComponent = null;
  #errorMessage = false;
  #bigTripContainer = null;

  constructor({bigTripContainer}) {
    this.#bigTripContainer = bigTripContainer;
  }

  init(errorMessage) {
    this.#errorMessage = errorMessage.isError;
    this.#loadingComponent = new LoadingView({
      isErrorMessage: this.#errorMessage
    });

    render(this.#loadingComponent, this.#bigTripContainer, RenderPosition.AFTERBEGIN);
  }

  destroyComponent () {
    if (this.#loadingComponent === null) {
      return;
    }

    remove(this.#loadingComponent);
  }
}
