import FilterView from './view/filter-view.js';
import InfoView from './view/info-view.js';
import { render } from './render.js';
import PointPresenter from './presenter/point-presenter.js';
import PointModel from './model/point-model.js';

const tripFiltersElement = document.querySelector('.trip-events');
const tripEventsFiltersElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const pointModel = new PointModel();

console.log(pointModel);

const eventsPresenter = new PointPresenter({
  eventsContainer: tripFiltersElement,
  pointModel
});
render(new InfoView(), tripMainElement, 'afterbegin');
render(new FilterView(), tripEventsFiltersElement);

eventsPresenter.init();
