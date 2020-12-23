import React, { useEffect, useState } from 'react';
import { CircularProgress, Container } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/actions';

import GlobalCases from '../Tables/GlobalCases/GlobalCases';
import CasesContainer from '../Tables/CasesByCity/CasesContainer';
import Map from '../Tables/Map/MapContainer';
import GroupedTabs from '../Tabs';
import AllKindsOfCases from '../Tables/AllKindsOfCases';
import Charts from '../Chart';

import classes from './App.module.scss';

function App({ byAllCases, byCountries, fetchData, loading, activeCountry, error }) {
  const [parameters, setParameters] = useState({
    globalCases: 'cases',
    casesSelected: 'Cases by country'
  });

  const [statisticField, setStatisticField] = useState({
    category: 'confirmed',
    timePeriod: 'total'
  });

  const commonCaregories = ['confirmed', 'deaths', 'recovered'];
  const timeCategories = ['total', 'today', 'total/100', 'today/100'];

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.app}>
      {loading ? <CircularProgress /> : !loading && !error ? <main className={classes.main__container}>
        <section className={'global__container'}>
          <GlobalCases casesType={parameters.globalCases} />
          <CasesContainer title={parameters.casesSelected} countries={byCountries} />
        </section>

        <section className='map__container'>
          <Map stat={statisticField} byAllCases={byAllCases} cases={byCountries} pickedCountry={activeCountry} />
          <GroupedTabs type={'category'} country={activeCountry} setStatisticField={setStatisticField} statisticField={statisticField} tabValues={commonCaregories} />
          <GroupedTabs type={'timePeriod'} country={activeCountry} setStatisticField={setStatisticField} statisticField={statisticField} tabValues={timeCategories} />
        </section>
        <section className={'allCases__container'}>
                <AllKindsOfCases />
        <Charts />
        </section>
  
      </main> : 'error'}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    byAllCases: state.byAllCases,
    byCountries: state.byCountries,
    loading: state.loading,
    activeCountry: state.activeCountry,
    error: state.error
  }
}

const mapDispatchStateToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(App);
