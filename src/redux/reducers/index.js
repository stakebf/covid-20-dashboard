import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  byCountries: [],
  byAllCases: {},
  error: null
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true
      };
    
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        byCountries: action.payload.byCountries,
        byAllCases: action.payload.byAllCases
      };
    
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default: 
      return state;
  }
}

export default reducer;
