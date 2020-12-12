import initialState from './initialState';
import {
  ON_EVENT
} from '../actions/actionTypes';

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case ON_EVENT:
      return {
        ...state,
        someData: action.payload,
      };

    default: 
      return state;
  }
}

export default reducer;
