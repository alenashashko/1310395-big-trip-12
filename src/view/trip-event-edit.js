import {ARRIVALS} from '../const.js';
import {MOVEMENTS} from '../const.js';
import {DESTINATIONS} from '../mock/trip-event.js';
import {OFFERS} from '../mock/trip-event.js';

const createTripMovementTypeSelectTemplate = () => {
  return MOVEMENTS.map((movementType) =>
    `<div class="event__type-item">
      <input id="event-type-${movementType.toLowerCase()}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${movementType.toLowerCase()}">
      <label class="event__type-label  event__type-label--${movementType.toLowerCase()}" for="event-type-${movementType.toLowerCase()}">${movementType}</label>
    </div>`).join(``);
};

const createTripArrivalTypeSelectTemplate = () => {
  return ARRIVALS.map((arrivalType) =>
    `<div class="event__type-item">
      <input id="event-type-${arrivalType.toLowerCase()}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${arrivalType.toLowerCase()}">
      <label class="event__type-label  event__type-label--${arrivalType.toLowerCase()}" for="event-type-${arrivalType.toLowerCase()}">${arrivalType}</label>
    </div>`).join(``);
};

const createTripDestinationSelectTemplate = () => {
  // destinations list will be received from the server
  return DESTINATIONS.map((destination) =>
    `<option value="${destination}"></option>`).join(``);
};

const createTripEventTimeTemplate = (time) => {
  return (
    `<div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time"
        type="text" name="event-start-time" value="${time.start}">
      &mdash;
      <label class="visually-hidden" for="event-end-time">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time"
        type="text" name="event-end-time" value="${time.end}">
    </div>`
  );
};

const createTripEventOffersTemplate = (offers) => {
  return offers.map((offer) =>
    `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.key}"
        type="checkbox" name="event-offer-${offer.key}" ${offer.isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${offer.key}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`).join(``);
};

const createTripEventPhotosTemplate = (photos) => {
  return photos.map((photo) =>
    `<img class="event__photo" src="${photo}" alt="Event photo">`).join(``);
};

export const createTripEventEditTemplate = (tripEvent = {}) => {
  // нужны ли непустые значения по умолчанию ??
  const {
    type = `Flight`,
    destination = `Geneva`,
    time = {
      start: `18/03/19 00:00`,
      end: `18/03/19 00:00`
    },
    price = ``,
    offers = OFFERS,
    // offers list (in case of create new event) will be received from the server
    description = `Geneva is a city in Switzerland that lies at
      the southern tip of expansive Lac Léman (Lake Geneva).
      Surrounded by the Alps and Jura mountains,
      the city has views of dramatic Mont Blanc.`,
    photos = [`../../public/img/photos/1.jpg`, `../../public/img/photos/2jpg`,
      `../../public/img/photos/3.jpg`, `../../public/img/photos/4.jpg`,
      `../../public/img/photos/5.jpg`]
  } = tripEvent;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17"
              src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>
              ${createTripMovementTypeSelectTemplate()}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>
              ${createTripArrivalTypeSelectTemplate()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination">
            ${type} ${ARRIVALS.includes(type) ? `in` : `to`}
          </label>
          <input class="event__input  event__input--destination" id="event-destination"
            type="text" name="event-destination" value="${destination}" list="destination-list">
          <datalist id="destination-list">
            ${createTripDestinationSelectTemplate()}
          </datalist>
        </div>

        ${createTripEventTimeTemplate(time)}

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price">
            <span class="visually-hidden">${price}</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price" type="text" name="event-price" value="">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${createTripEventOffersTemplate(offers)}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createTripEventPhotosTemplate(photos)}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};
