import {
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  SET_ACTIVE_COUNTRY,
  FETCH_HISTORICAL_DATA_COUNTRY_SUCCESS,
  FETCH_HISTORICAL_DATA_COUNTRY_START,
  FETCH_HISTORICAL_DATA_COUNTRY_ERROR
} from '../actions/actionTypes';

const initialState = {
  loading: true,
  byCountries: [],
  byAllCases: {},
  activeCountry: {},
  byHistoricalAll: {},
  error: null,
  histDataError: null,
  histLoading: false,
  byHistoricalCountry: {},
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        byCountries: action.payload.byCountries,
        byAllCases: action.payload.byAllCases,
        byHistoricalAll: action.payload.byHistoricalAll
      };
    
    case FETCH_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case SET_ACTIVE_COUNTRY:
      return {
        ...state,
        activeCountry: action.payload
      };

    case FETCH_HISTORICAL_DATA_COUNTRY_START:
      return {
        ...state,
        histLoading: true,
      };

    case FETCH_HISTORICAL_DATA_COUNTRY_SUCCESS:
      return {
        ...state,
        histLoading: false,
        histDataError: null,
        byHistoricalCountry: action.payload
      };

    case FETCH_HISTORICAL_DATA_COUNTRY_ERROR:
      return {
        ...state,
        histLoading: false,
        histDataError: action.payload
      };

    default: 
      return state;
  }
}

export default reducer;
