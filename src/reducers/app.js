import { TOGGLE_NAV, CLOSE_NAV } from '../actions/actionTypes';

const initialState = {
  open: false
};

const app = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAV: {
      return {
        ...state,
        open: !state.open
      };
    }
    case CLOSE_NAV: {
      return {
        ...state,
        open: false
      };
    }
    default: {
      return state;
    }
  }
};

export default app;
