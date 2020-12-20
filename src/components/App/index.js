import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/actions';
import GlobalCases from '../Tables/GlobalCases/GlobalCases'
import CasesContainer from '../Tables/CasesByCity/CasesContainer'
import Map from '../Tables/Map/MapContainer'
import Switcher from '../Tables/Map/Switcher'
import MapTabContainer from '../Tables/Map/TabPanel'
import classes from './App.module.scss';

function App({ byAllCases, byCountries, fetchData, loading }) {
  const [parameters, setParameters] = useState({
    globalCases: 'cases',
    casesSelected: 'Cases by country'
  })

  const [statisticField, setStatisticField] = useState({
    category: 'confirmed',
    timePeriod: 'total'
  });

  const [location, setLocation] = useState([53.90033950661763, 27.562463259670654]);
  const [pickedCountry, setCountry] = useState(null)
  // useState({
  //   active: 21024,
  //   activePerOneMillion: 2225.26,
  //   cases: 169648,
  //   casesPerOneMillion: 17956,
  //   continent: "Europe",
  //   country: "Belarus",
  //   countryInfo: {
  //     flag: "https://disease.sh/assets/img/flags/by.png",
  //     iso2: "BY",
  //     iso3: "BLR",
  //     lat: 53,
  //     long: 28,
  //     _id: 112,
  //   },
  //   critical: 0,
  //   criticalPerOneMillion: 0,
  //   deaths: 1308,
  //   deathsPerOneMillion: 138,
  //   oneCasePerPeople: 56,
  //   oneDeathPerPeople: 7223,
  //   oneTestPerPeople: 3,
  //   population: 9447876,
  //   provinces: null,
  //   recovered: 147316,
  //   recoveredPerOneMillion: 15592.5,
  //   tests: 3718238,
  //   testsPerOneMillion: 393553,
  //   todayCases: 1917,
  //   todayDeaths: 9,
  //   todayRecovered: 1919,
  //   updated: 1608296352291,
  // });
  const commonCaregories = ['confirmed', 'deaths', 'recovered'];
  const timeCategories = ['total', 'today', 'total/100', 'today/100'];

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.app}>
      {loading && <CircularProgress />}
      <main className={classes.main__container}>
        <GlobalCases casesType={parameters.globalCases} />
        <CasesContainer title={parameters.casesSelected} countries={byCountries} setCountry={setCountry} setLocation={setLocation} />
        <Container className='map__container'>
          <MapTabContainer type={'category'} country={pickedCountry} setStatisticField={setStatisticField} statisticField={statisticField} tabValues={commonCaregories} />
          <MapTabContainer type ={'timePeriod'} country={pickedCountry} setStatisticField={setStatisticField} statisticField={statisticField} tabValues={timeCategories} />

          {/* <Switcher setStat={setStatisticField} /> */}
          <Map stat={statisticField} byAllCases={byAllCases} byCountries={byCountries} location={location} pickedCountry={pickedCountry} />
        </Container>
      </main>

      {/* {!!byCountries.length && byCountries.map((item) => <div>{item.country}</div>)} */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    byAllCases: state.byAllCases,
    byCountries: state.byCountries,
    loading: state.loading
  }
}

const mapDispatchStateToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(App);
