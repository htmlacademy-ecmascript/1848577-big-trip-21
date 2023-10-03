import BigTripPresenter from './presenter/big-trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import TripManagementPresenter from './presenter/trip-managemet-presenter.js';
import LoadingPresenter from './presenter/loading-presenter.js';
import NewEventButtonModel from './model/new-event-button-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api-service/points-api-service.js';
import {AUTHORIZATION, END_POINT} from './const.js';

const tripFiltersElement = document.querySelector('.trip-events');
const tripEventsFiltersElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');

const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const loadingPresenter = new LoadingPresenter({
  bigTripContainer: tripFiltersElement
});

const offersModel = new OffersModel({
  service: pointsApiService
});
const destinationsModel = new DestinationsModel({
  service: pointsApiService
});
const pointsModel = new PointsModel({
  service: pointsApiService,
  loadingPresenter,
  tripManagementPresenter: getTripManagementPresenter,
  destinationsModel,
  offersModel
});

const newEventButtonModel = new NewEventButtonModel();
const filterModel = new FilterModel();

const bigTripPresenter = new BigTripPresenter({
  pointContainer: tripFiltersElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  newEventButtonModel,
  loadingPresenter
});

function getTripManagementPresenter () {
  const tripManagementPresenter = new TripManagementPresenter({
    pointsModel,
    filterModel,
    tripEventsFiltersElement,
    tripMainElement,
    destinationsModel,
    offersModel,
    newEventButtonModel
  });

  tripManagementPresenter.init();
}

pointsModel.init();
bigTripPresenter.init();
