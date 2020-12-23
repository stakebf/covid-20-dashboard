import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';

import GlobalCases from '../Tables/GlobalCases/GlobalCases';
import CasesContainer from '../Tables/CasesByCity/CasesContainer';
import Map from '../Tables/Map/MapContainer';
import GroupedTabs from '../Tabs';
import AllKindsOfCases from '../Tables/AllKindsOfCases';
import Charts from '../Chart';

import classes from './AppWrapper.module.scss';

const AppWrapper = ({ byAllCases, byCountries, activeCountry }) => {
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

  return (
    <main className={classes.main__container}>
      <AllKindsOfCases />
      <Charts />
      <GlobalCases casesType={parameters.globalCases} />
      <CasesContainer title={parameters.casesSelected} countries={byCountries} />
      <Container className='map__container'>
        <GroupedTabs type={'category'} country={activeCountry} setStatisticField={setStatisticField} statisticField={statisticField} tabValues={commonCaregories} />
        <GroupedTabs type ={'timePeriod'} country={activeCountry} setStatisticField={setStatisticField} statisticField={statisticField} tabValues={timeCategories} />
        <Map stat={statisticField} byAllCases={byAllCases} cases={byCountries} pickedCountry={activeCountry} />
      </Container>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    byAllCases: state.byAllCases,
    byCountries: state.byCountries,
    activeCountry: state.activeCountry
  }
}

export default connect(mapStateToProps)(AppWrapper);
