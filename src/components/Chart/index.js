import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { getCountriesData } from '../../helpers/chartHelpers';
import { chartOptions } from '../../models/chartConfig';
import classes from './Chart.module.scss';

const Charts = ({ 
  activeCountry, 
  byHistoricalAll, 
  byHistoricalCountry, 
  byAllCases,
  loading }) => {
  return (
    <div className={classes.chartContainer}>
      {loading && <CircularProgress className={classes.loader} />}
      <Line 
        data={getCountriesData(
          byHistoricalAll, 
          byHistoricalCountry,
          activeCountry,
          byAllCases
        )}
        options={chartOptions(byHistoricalCountry, activeCountry)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    activeCountry: state.activeCountry,
    byHistoricalAll: state.byHistoricalAll,
    byHistoricalCountry: state.byHistoricalCountry,
    byAllCases: state.byAllCases,
    loading: state.histLoading
  };
}

export default connect(mapStateToProps)(Charts);
