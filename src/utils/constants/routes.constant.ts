const API_ROUTES = {
  USERS: '/users',
  RECEIVERS: '/receivers',
  LOGIN: '/auth/login',
  RECEIVERS_FILTER: '/receivers/filter',
  RECEIVERS_MEMO_DETAILS: '/receiver-memo-details',
  RECEIVERS_MEMO_DETAILS_EXPOSURE: '/receiver-memo-details/exposure',
};

const WEB_ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  GAMES: '/games',
};

const QUERY_KEYS = {
  GET_USERS: 'GET_USERS',
  GET_RECEIVERS: 'GET_RECEIVERS',
  GET_LOCATION_SUGGESTIONS: 'GET_LOCATION_SUGGESTIONS',
  GET_LOCATION_BY_COORD: 'GET_LOCATION_BY_COORD',
};

export { API_ROUTES, QUERY_KEYS, WEB_ROUTES };
