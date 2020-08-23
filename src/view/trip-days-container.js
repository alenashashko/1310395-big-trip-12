import {createElement} from '../utils.js';

const createTripDaysContainerTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDaysContainer {
  constructor() {
    this._element = null;
  }

  _getTemplate() {
    return createTripDaysContainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this._getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
