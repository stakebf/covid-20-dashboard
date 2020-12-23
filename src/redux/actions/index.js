import { 
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  SET_ACTIVE_COUNTRY,
  FETCH_HISTORICAL_DATA_COUNTRY_SUCCESS,
  FETCH_HISTORICAL_DATA_COUNTRY_START,
  FETCH_HISTORICAL_DATA_COUNTRY_ERROR
} from './actionTypes';
import { getProvinceMap } from '../../helpers/getProvinceMap';
import WorldometrsService from '../../services/WorldometrsService';
import { countriesCoordinates } from '../../models/countriesCoordinates';

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataStart());

    try {
      const dataByCountryAll = await WorldometrsService.getFromJhucsseByAllCountry();
      const dataByCountryUSA = await WorldometrsService.getFromJhucsseByCountryUSA();
      const dataByCountries = await WorldometrsService.getAllCountriesInfo();
      const dataByAllCases = await WorldometrsService.getAllCases();
      const dataByHistoricalAll = await WorldometrsService.getFromJhucsseByHistoricalAll();

      const data = dataByCountries.map((item) => {
        const provinces = dataByCountryAll.filter(({ country, province }) => (item.country === country) && province);
        const countryCoordinates = countriesCoordinates.find((countryInfo) => item.country === countryInfo.name);
        
        if (countryCoordinates) {
          item.countryInfo.lat = countryCoordinates.latitude;
          item.countryInfo.long = countryCoordinates.longitude;
        }
        
        if (Object.keys(provinces).length) {
          item.provinces = getProvinceMap(provinces);
          
        } else {
          item.provinces = null;
        }
    
        if (item.country === 'USA') {
          item.provinces = getProvinceMap(dataByCountryUSA);
        }
        
        return item;
      });

      dispatch(fetchDataSuccess(data, dataByAllCases, dataByHistoricalAll));
    } catch (e) {
      dispatch(fetchDataError(e));
    }
  }
};

export const fetchDataStart = () => {
  return {
    type: FETCH_DATA_START
  };
};

export const fetchDataSuccess = (data, dataByAllCases, dataByHistoricalAll) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: {
      byCountries: data,
      byAllCases: dataByAllCases,
      byHistoricalAll: dataByHistoricalAll
    }
  };
}

export const fetchDataError = (e) => {
  return {
    type: FETCH_DATA_ERROR,
    payload: e
  };
};

export const setActiveCountry = (country) => {
  return {
    type: SET_ACTIVE_COUNTRY,
    payload: country
  };
};

export const fetchHistorcalDataByCountry = (country) => {
  return async (dispatch) => {
    try {
      dispatch(fetchHistoricalDataStart());
      const historicalDataByCountry = await WorldometrsService.getFromJhucsseByHistorical(country);
      dispatch(fetchHistoricalDataSuccess(historicalDataByCountry));
    } catch (e) {
      dispatch(fetchHistoricalDataError(e));
    }
  }
};

export const fetchHistoricalDataStart = () => {
  return {
    type: FETCH_HISTORICAL_DATA_COUNTRY_START,
  };
};

export const fetchHistoricalDataSuccess = (data) => {
  return {
    type: FETCH_HISTORICAL_DATA_COUNTRY_SUCCESS,
    payload: data
  };
};

export const fetchHistoricalDataError = (e) => {
  console.log(e);
  return {
    type: FETCH_HISTORICAL_DATA_COUNTRY_ERROR,
    payload: e
  };
};
