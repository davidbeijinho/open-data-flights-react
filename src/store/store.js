import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

export default createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);
