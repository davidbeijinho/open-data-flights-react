import { SET_MEASURE, SET_YEAR, SET_COUNTRY } from './actionTypes';

export const setMeasure = (measure) => ({
  type: SET_MEASURE,
  payload: {
    measure
  }
});

export const setYear = (year) => ({
  type: SET_YEAR,
  payload: { year }
});

export const setCountry = (country) => ({
  type: SET_COUNTRY,
  payload: { country }
});
