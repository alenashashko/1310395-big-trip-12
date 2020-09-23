export const ARRIVALS = [`Check-in`, `Sightseeing`, `Restaurant`];
export const MOVEMENTS = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];

export const icons = {
  'Check-in': `🏨`,
  'Sightseeing': `🏛`,
  'Restaurant': `🍴`,
  'Taxi': `🚕`,
  'Bus': `🚌`,
  'Train': `🚂`,
  'Ship': `🛥`,
  'Transport': `🚊`,
  'Drive': `🚗`,
  'Flight': `✈`
};

export const MillisecondsInTimePeriod = {
  MINUTE: 60000,
  HOUR: 3600000,
  DAY: 86400000
};

export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`
};

export const ActionType = {
  UPDATE_EVENT: `update_event`,
  ADD_EVENT: `add_event`,
  DELETE_EVENT: `delete_event`
};

export const UpdateType = {
  PATCH: `patch`,
  MINOR: `minor`,
  MAJOR: `major`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const MenuItem = {
  TABLE: `table`,
  STATS: `stats`
};
