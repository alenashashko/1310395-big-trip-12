import TripInfoContainerView from './view/trip-info-container.js';
import TripInfoView from './view/trip-info.js';
import TripPriceView from './view/trip-price.js';
import SiteMenuView from './view/site-menu.js';
import TripEventsFilterView from './view/trip-events-filter.js';
import {generateTripDay} from './mock/trip-event.js';
import {getRandomInteger} from './utils/common.js';
import {RenderPosition, render} from './utils/render.js';
import TripPresenter from './presenter/trip.js';

export const tripDays = new Array(getRandomInteger(1, 6)).fill().map(generateTripDay);
// may be from 1 to 6 days (mock number)

const headerElement = document.querySelector(`.page-header`);
const headerContainerElement = headerElement.querySelector(`.trip-main`);
const tripControlsContainerElement = headerContainerElement.querySelector(`.trip-controls`);
const siteMenuHeaderElement = tripControlsContainerElement.querySelector(`h2:nth-child(1)`);
const tripEventsFilterHeaderElement = tripControlsContainerElement.querySelector(`h2:nth-child(2)`);
const mainElement = document.querySelector(`main`);
const tripEventsContainerElement = mainElement.querySelector(`.trip-events`);

const getAllEvents = (days) => {
  let allEvents = [];

  days.forEach((day) => {
    allEvents = [...allEvents, ...day.tripEvents];
  });

  return allEvents;
};

const tripPresenter = new TripPresenter(tripEventsContainerElement);

const renderTripInfo = (container, events) => {
  render(container, new TripInfoContainerView(), RenderPosition.AFTERBEGIN);

  const tripInfoContainerElement = container.querySelector(`.trip-info`);

  render(tripInfoContainerElement, new TripPriceView());
  // цена должна быть = 0 при пустом массиве allEvents

  if (events.length !== 0) {
    render(tripInfoContainerElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);
  }
};

render(siteMenuHeaderElement, new SiteMenuView(), RenderPosition.AFTEREND);
render(tripEventsFilterHeaderElement, new TripEventsFilterView(), RenderPosition.AFTEREND);

const allEvents = getAllEvents(tripDays);

renderTripInfo(headerContainerElement, allEvents);
tripPresenter.init(tripDays, allEvents);
