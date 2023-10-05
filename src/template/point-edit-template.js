import he from 'he';
import {humanizeDate, createToUpperCase} from '../utils/utils.js';
import {DateFormat, END_POINT} from '../const.js';

const createOfferSelectorTemplate = (offers, point, isDisabled) =>
  offers.map((item) => {
    const isChecked = point.offers.includes(item.id);

    return (
      `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${item.id}" type="checkbox" name="${item.id}" data-offer-id="${item.id}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
    <label class="event__offer-label" for="${item.id}">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
      </div>`
    );
  }).join('');

const createOffersElementTemplate = (offers, point, isDisabled) => {
  const offersElement = (offers.length === 0) ? '' :
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        ${createOfferSelectorTemplate(offers, point, isDisabled)}
      </div>
    </section>`;
  return offersElement;
};

const createElementPictures = (pictures) =>
  `${(pictures) ?
    `<div class="event__photos-tape">
    ${(pictures).map((picture) =>
    `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`
  ).join('')}
      </div>`
    : ''}`;

const createDestinationElementTemplate = (destination) => {
  if (!destination) {
    return '';
  }

  const destinationElement = (!destination.description.length && !destination.pictures.length) ? '' :
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destination.description ?
    `<p class="event__destination-description">${destination.description}</p>`
    : ''}
      ${destination.pictures.length ?
    `<div class="event__photos-container">
          ${createElementPictures(destination.pictures)}
        </div>`
    : ''}
    </section>
  `;

  return destinationElement;
};

const createDatalistElement = (destinations) => {
  const datalistElement = (destinations.length === 0) ? '' :
    destinations.map((item) => `<option value="${item.name}"></option>`).join('');
  return `
    <datalist id="destination-list-1">
      ${datalistElement}
    </datalist>
  `;
};

const createTypesListTemplate = (offerTypes, type, isDisabled) => {
  const offerType = (offerTypes.length === 0) ? '' :
    offerTypes.map((item) => (
      `<div class="event__type-item">
        <input
          id="event-type-${item.type}-1"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${item.type}"
          ${(item.type === type) ? 'checked' : ''}
        >
        <label class="event__type-label  event__type-label--${item.type}" for="event-type-${item.type}-1">${createToUpperCase(item.type)}</label>
      </div>`)).join('');

  return `
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? 'disabled' : ''}>
      <div class="event__type-list">
        <fieldset class="event__type-group">
        <legend class="visually-hidden">Event type</legend>
          ${offerType}
      </div>
     </div>`;
};

const createPointEditTemplate = ({point, pointDestinations, pointOffers, isNew}) => {
  const { dateFrom, dateTo, type, basePrice, destination, isDisabled, isSaving, isDeleting } = point;
  const offersByType = pointOffers.find((item) => item.type === type).offers;
  const currentDestination = pointDestinations.find((item) => item.id === destination);
  const valueDestination = (currentDestination) ? `${currentDestination.name}` : '';

  const getCurrentButton = () => {
    if (isNew) {
      return 'Cancel';
    }

    const isDelete = (isDeleting)
      ? 'Deleting...'
      : 'Delete';

    return isDelete;
  };

  return `
    <li class="trip-events__item">
    <form class="event event--edit" action="${END_POINT}" method="post">
      <header class="event__header">
      ${createTypesListTemplate(pointOffers, type, isDisabled)}
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(valueDestination)}" list="destination-list-1" required ${isDisabled ? 'disabled' : ''}>
          ${createDatalistElement(pointDestinations)}
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${he.encode(humanizeDate(dateFrom, DateFormat.FULL_DATA))}" required ${isDisabled ? 'disabled' : ''}>
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, DateFormat.FULL_DATA)}" required ${isDisabled ? 'disabled' : ''}>
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(String(basePrice))}" min="1" autocomplete="off" required ${isDisabled ? 'disabled' : ''}>
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'Saving...' : 'Save'}
          </button>
          <button class="event__reset-btn" type="reset" ${isDisabled ? 'disabled' : ''}>
            ${getCurrentButton()}
          </button>
          ${(isNew) ? '' : `
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
          `}
      </header>
      <section class="event__details">
        ${createOffersElementTemplate(offersByType, point, isDisabled)}
        ${createDestinationElementTemplate(currentDestination)}
        </section>
      </section>
    </form>
  </li>
`;
};

export {createPointEditTemplate};
