import { 
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  SET_ACTIVE_COUNTRY
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
      console.log(dataByCountryAll, dataByCountries);

      const data = dataByCountries.map((item) => {
        const provinces = dataByCountryAll.filter(({ country, province }) => (item.country === country) && province);
        const countryCoordinates = countriesCoordinates.find((countryInfo) => item.country === countryInfo.name);
        
        if (countryCoordinates) {
          // console.log(countryCoordinates);
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

      dispatch(fetchDataSuccess(data, dataByAllCases));
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

export const fetchDataSuccess = (data, dataByAllCases) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: {
      byCountries: data,
      byAllCases: dataByAllCases
    }
  };
}

export const fetchDataError = (e) => {
  console.log(e);
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
