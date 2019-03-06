import { SET_MEASURE, SET_YEAR, SET_COUNTRY } from '../actions/actionTypes';

const initialState = {
  measure: 'PAS_BRD',
  year: '2001',
  country: 'PT'
};

const query = (state = initialState, action) => {
  switch (action.type) {
    case SET_MEASURE: {
      return {
        ...state,
        measure: action.payload.measure
      };
    }
    case SET_YEAR: {
      return {
        ...state,
        year: action.payload.year
      };
    }
    case SET_COUNTRY: {
      return {
        ...state,
        country: action.payload.country
      };
    }
    default: {
      return state;
    }
  }
};

export default query;
