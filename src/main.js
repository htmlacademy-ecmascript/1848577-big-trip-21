import BigTripPresenter from './presenter/big-trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import MockService from './service/mock-service.js';
import TripManagementPresenter from './presenter/trip-managemet-presenter.js';

const tripFiltersElement = document.querySelector('.trip-events');
const tripEventsFiltersElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const mockService = new MockService();
const pointsModel = new PointsModel(mockService);
const offersModel = new OffersModel(mockService);
const destinationsModel = new DestinationsModel(mockService);

const pointPresenter = new BigTripPresenter({
  pointContainer: tripFiltersElement,
  pointsModel,
  offersModel,
  destinationsModel
});

const tripManagementPresenter = new TripManagementPresenter({
  tripFilterElement: tripEventsFiltersElement,
  tripMainElement,
  pointsModel
});

pointPresenter.init();
tripManagementPresenter.init();
