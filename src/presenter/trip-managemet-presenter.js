import { render, RenderPosition } from '../framework/render';
import InfoView from '../view/info-view.js';
import FilterPresenter from '../presenter/filter-presenter.js';

export default class TripManagementPresenter {
  #pointsModel = null;
  #filterModel = null;
  #tripMainElement = null;
  #tripEventsFiltersElement = null;

  constructor({ pointsModel, filterModel, tripFilterElement: tripEventsFiltersElement, tripMainElement }) {
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#tripMainElement = tripMainElement;
    this.#tripEventsFiltersElement = tripEventsFiltersElement;
  }

  init() {
    this.#renderTripManagement();
  }

  #renderTripManagement() {
    this.#renderFilter();
    this.#renderInfo();
  }

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#tripEventsFiltersElement,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });

    filterPresenter.init();
  }

  #renderInfo() {
    render(new InfoView(), this.#tripMainElement, RenderPosition.AFTERBEGIN);
  }

}
