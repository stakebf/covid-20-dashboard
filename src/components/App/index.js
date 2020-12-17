import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/actions';
import GlobalCases from '../Tables/GlobalCases/GlobalCases'
import CasesContainer from '../Tables/CasesByCity/CasesContainer'
import Map from '../Tables/Map/MapContainer'
import Switcher from '../Tables/Map/Switcher'
import classes from './App.module.scss';

function App({ byAllCases, byCountries, fetchData, loading }) {
  const [state, setState] = useState({
    globalCases: 'cases',
    casesSelected: 'Cases by country'
  })

  const [statisticField, setStatisticField] = useState('confirmed');
  const [location, setLocation] = useState([39.6745567899274, -20.190688951235135]);


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.app}>
      {loading && <CircularProgress />}
      <main>
        {console.log(byCountries, 'bBu')}
        <GlobalCases casesType={state.globalCases} />
        <CasesContainer title={state.casesSelected} countries={byCountries} setLocation={setLocation}/>
        <Container className='map__container'>
          <Switcher setStat={setStatisticField} />
          <Map stat={statisticField} byAllCases={byAllCases} byCountries={byCountries} location={location}/>
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
