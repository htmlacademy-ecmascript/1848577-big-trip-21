import { render } from './render.js';
import FilterView from './view/filter-view.js';
import InfoView from './view/info-view.js';
import PointPresenter from './presenter/point-presenter.js';
import PointsModel from './model/point-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destination-model.js';
import MockService from './service/mock-service.js';

const tripFiltersElement = document.querySelector('.trip-events');
const tripEventsFiltersElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const pointPresenter = new PointPresenter({
  pointContainer: tripFiltersElement,
  pointsModel,
  offersModel,
  destinationsModel
});

render(new InfoView(), tripMainElement, 'afterbegin');
render(new FilterView(), tripEventsFiltersElement);

pointPresenter.init();
