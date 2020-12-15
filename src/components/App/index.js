import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/actions';
import GlobalCases from '../Tables/GlobalCases/GlobalCases'
import CasesContainer from '../Tables/CasesByCity/CasesContainer'

import classes from './App.module.scss';

function App({ byAllCases, byCountries, fetchData, loading }) {
  const [state, setState] = useState({
    globalCases: 'cases',
    casesSelected: 'Cases by country'
  })
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.app}>
      {loading && <CircularProgress />}
      <main>
        {console.log(byCountries)}
        <GlobalCases casesType={state.globalCases} />
        <CasesContainer title={state.casesSelected} countries={byCountries}/>
        {/* <Container className='map__container'>
          <Switcher setStat={setStat} />
          <Map stat={stat} />
        </Container> */}
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
