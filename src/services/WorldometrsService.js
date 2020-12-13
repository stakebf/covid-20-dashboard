
class WorldometrsService {
  _API_URL = 'https://corona.lmao.ninja/v3/covid-19';

  async getResource(url) {
    const res = await fetch(url);

    return await res.json();
  }
  
  getAllCases() {
    return this.getResource(`${this._API_URL}/all`);
  }
  
  getAllStatesUSInfo() {
    return this.getResource(`${this._API_URL}/states`);
  }
  
  getStateUSInfo(state) {
    return this.getResource(`${this._API_URL}/states/${state}`);
  }
  
  getAllContinentsInfo() {
    return this.getResource(`${this._API_URL}/continents`);
  }
  
  getContinentInfo(continent) {
    return this.getResource(`${this._API_URL}/continents/${continent}`);
  }
  
  getAllCountriesInfo() {
    return this.getResource(`${this._API_URL}/countries`);
  }
  
  getCountryInfo(country) {
    return this.getResource(`${this._API_URL}/countries/${country}`);
  }
  
  getInfoByCountriesArray(arrayCountries) {
    return this.getResource(`${this._API_URL}/countries/${arrayCountries.join(',')}`);
  }
}

export default WorldometrsService;
