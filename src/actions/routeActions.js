import { getRoutes } from '../lib/routes.js';
import {
  REQUEST_ROUTES,
  RECEIVE_ROUTES,
  INVALIDATE_ROUTES
} from './actionTypes';

export const requestPosts = (data) => ({
  type: REQUEST_ROUTES,
  payload: {
    data
  }
});

export const receiveRoutes = (data) => ({
  type: RECEIVE_ROUTES,
  payload: {
    data
  }
});

export const invalidateRoutes = () => ({
  type: INVALIDATE_ROUTES
});

const fetchPosts = (data) => (dispatch) => {
  dispatch(requestPosts(data));
  return getRoutes(data).then((routes) => dispatch(receiveRoutes(routes)));
};

export const fetchRoutesIfNeeded = () => (dispatch, getState) =>
  dispatch(fetchPosts(getState().query));
