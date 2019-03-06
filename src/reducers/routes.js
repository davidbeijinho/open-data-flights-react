import {
  REQUEST_ROUTES,
  RECEIVE_ROUTES,
  INVALIDATE_ROUTES
} from '../actions/actionTypes';

const initialState = {
  routes: [],
  loading: false,
  fetched: false
};

const routes = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ROUTES: {
      return {
        ...state,
        loading: true
      };
    }
    case RECEIVE_ROUTES: {
      return {
        ...state,
        routes: action.payload.data,
        fetched: true
      };
    }
    case INVALIDATE_ROUTES: {
      return {
        ...state,
        routes: [],
        fetched: false
      };
    }
    default: {
      return state;
    }
  }
};

export default routes;
