import { combineReducers } from 'redux';
import query from './query';
import app from './app';
import routes from './routes';

export default combineReducers({ query, app, routes });
