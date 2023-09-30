import { render } from './framework/render.js';
import BigTripPresenter from './presenter/big-trip-presenter.js';
import PointsModel from './model/points-model.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import TripManagementPresenter from './presenter/trip-managemet-presenter.js';
import NewEventButtonView from './view/new-event-button-view.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './api-service/points-api-service.js';
import OffersApiService from './api-service/offers-api-service.js';
import DestinationsApiService from './api-service/destinations-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';
import { showAlert } from './utils/utils.js';

const tripFiltersElement = document.querySelector('.trip-events');
const tripEventsFiltersElement = document.querySelector('.trip-controls__filters');
const tripMainElement = document.querySelector('.trip-main');
const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const bigTripPresenter = new BigTripPresenter({
  pointContainer: tripFiltersElement,
  pointsModel,
  offersModel,
  destinationsModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

const tripManagementPresenter = new TripManagementPresenter({
  pointsModel,
  filterModel,
  tripEventsFiltersElement,
  tripMainElement,
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewEventButtonClick
});

function handleNewEventButtonClick() {
  bigTripPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}

function handleNewPointFormClose() {
  newEventButtonComponent.element.disabled = false;
}

offersModel.init()
  .then(() => destinationsModel.init())
  .then(() => {
    pointsModel.init().finally(() => {
      render(newEventButtonComponent, tripMainElement);
    });
  })
  .catch(() => {
    showAlert('Can\'t loading data. Try again later.');
  });

tripManagementPresenter.init();
bigTripPresenter.init();
