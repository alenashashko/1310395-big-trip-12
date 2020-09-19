import {ARRIVALS, MOVEMENTS} from '../const.js';
import {DESTINATIONS, OFFERS} from '../mock/trip-event.js';
// destinations list will be received from the server
import SmartView from './smart.js';
import {formatEventDate} from '../utils/event.js';
import Mode from '../presenter/event.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const BLANK_EVENT = {// нужны ли непустые значения по умолчанию ??
  isFavorite: false,
  type: `Flight`,
  destination: `Geneva`,
  time: {
    start: `18/03/19 00:00`,
    end: `18/03/19 00:00`
  },
  price: ``,
  offers: OFFERS,
  // offers list (in case of create new event) will be received from the server
  description: `Geneva is a city in Switzerland that lies at
    the southern tip of expansive Lac Léman (Lake Geneva).
    Surrounded by the Alps and Jura mountains,
    the city has views of dramatic Mont Blanc.`,
  photos: [`../../public/img/photos/1.jpg`, `../../public/img/photos/2jpg`,
    `../../public/img/photos/3.jpg`, `../../public/img/photos/4.jpg`,
    `../../public/img/photos/5.jpg`]
};

export default class TripEventEdit extends SmartView {
  constructor(event = BLANK_EVENT) {
    super();
    // this._event = event; ???
    this._data = TripEventEdit.copyEvent(event);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._eventTypeChangeHandler = this._eventTypeChangeHandler.bind(this);
    this._destinationInputHandler = this._destinationInputHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    this._priceInputHandler = this._priceInputHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setDatePicker();
  }

  _createTripEventTimeTemplate(time) {
    return (
      `<div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time">
          From
        </label>
        <input class="event__input  event__input--time" id="event-start-time"
          type="text" name="event-start-time" value="${formatEventDate(time.start, Mode.EDITING)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time">
          To
        </label>
        <input class="event__input  event__input--time" id="event-end-time"
          type="text" name="event-end-time" value="${formatEventDate(time.end)}">
      </div>`
    );
  }

  _createTripEventOffersTemplate(offers) {
    return offers.map((offer) =>
      `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.key}"
          type="checkbox" name="event-offer-${offer.key}"  value="${offer.key}"
          ${offer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${offer.key}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join(``);
  }

  getTemplate() {
    const {isFavorite, type, destination, time, price, offers, description, photos} = this._data;
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
                ${MOVEMENTS.map((movementType) => `<div class="event__type-item">
                    <input id="event-type-${movementType.toLowerCase()}" class="event__type-input
                      visually-hidden" type="radio" name="event-type" value="${movementType.toLowerCase()}"
                      ${type === movementType ? `checked` : ``}>
                    <label class="event__type-label  event__type-label--${movementType.toLowerCase()}"
                      for="event-type-${movementType.toLowerCase()}">
                      ${movementType}
                    </label>
                  </div>`).join(``)}
              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${ARRIVALS.map((arrivalType) => `<div class="event__type-item">
                  <input id="event-type-${arrivalType.toLowerCase()}" class="event__type-input
                    visually-hidden" type="radio" name="event-type" value="${arrivalType.toLowerCase()}"
                    ${type === arrivalType ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--${arrivalType.toLowerCase()}"
                    for="event-type-${arrivalType.toLowerCase()}">${arrivalType}</label>
                </div>`).join(``)}
              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination">
              ${type[0].toUpperCase() + type.slice(1)}
              ${ARRIVALS.includes(type[0].toUpperCase() + type.slice(1)) ? `in` : `to`}
            </label>
            <input class="event__input  event__input--destination" id="event-destination"
              type="text" name="event-destination" value="${destination}" list="destination-list">
            <datalist id="destination-list">
              ${DESTINATIONS.map((it) => `<option value="${it}"></option>`).join(``)}
            </datalist>
          </div>

          ${this._createTripEventTimeTemplate(time)}

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price" type="text"
              name="event-price" value="${price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
            ${isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>

        </header>

        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${this._createTripEventOffersTemplate(offers)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${photos.map((photo) => `<img class="event__photo" src="${photo}"
                  alt="Event photo">`).join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>`
    );
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(event) {
    this.updateData(event);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatePicker();

    this.setFormSubmitHandler();
    this.setFavoriteClickHandler();
  }

  _setDatePicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time`),
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
          defaultDate: this._data.time.start,
          onClose: this._startDateChangeHandler
        }
    );

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time`),
        {
          enableTime: true,
          dateFormat: `d/m/Y H:i`,
          minDate: this._data.time.start,
          defaultDate: this._data.time.end,
          onClose: this._endDateChangeHandler
        }
    );
  }

  _setInnerHandlers() {
    this
      .getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._eventTypeChangeHandler);
    this
      .getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`input`, this._destinationInputHandler);
    this
      .getElement()
      .querySelector(`.event__field-group--price`)
      .addEventListener(`input`, this._priceInputHandler);
    this
      .getElement()
      .querySelector(`.event__available-offers`)
      .addEventListener(`change`, this._offersChangeHandler);
  }

  _eventTypeChangeHandler(evt) {
    this.updateData({
      type: evt.target.value
    });
  }

  _destinationInputHandler(evt) {
    this.updateData({
      destination: evt.target.value
    }, true);
  }

  _startDateChangeHandler([userDate]) {
    this.updateData({
      time: {
        start: userDate,
        end: this._data.time.end // ?
      }
    });
  }

  _endDateChangeHandler([userDate]) {
    this.updateData({
      time: {
        start: this._data.time.start,
        end: userDate
      }
    });
  }

  _priceInputHandler(evt) {
    this.updateData({
      price: evt.target.value
    }, true);
  }

  _offersChangeHandler(evt) {
    this.updateData({
      offers: this._data.offers.map((offer) => {
        if (offer.key === evt.target.value) {
          offer.isChecked = !offer.isChecked;
        }

        return offer;
      })
    });
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._data);
  }

  _favoriteClickHandler() {
    this._callback.favoriteClick();
  }

  _deleteClickHandler() {
    this._callback.deleteClick(this._data);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback || this._callback.formSubmit;
    this.getElement().addEventListener(`submit`, this._formSubmitHandler);
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback || this._callback.favoriteClick;
    this.getElement().querySelector(`.event__favorite-icon`).addEventListener(`click`, this._favoriteClickHandler);
  }

  static copyEvent(event) {
    return Object.assign(
        {},
        event
    );
  }
}

// нужно отображать доп опции, соответствующие типу (при смене дополнительных опций выбранные значения не сохраняются)
// cancel при создании новой точки маршрута
// isFavorite добавила прямо в данные?
// менять описание при выборе пункта назначения
// при удалении всех событий из дня остается пустой контейнер дня ?
