import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/actions';

import AppWrapper from '../AppWrapper';
import classes from './App.module.scss';

function App({ fetchData, loading, error }) {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.app}>
      {loading ? <CircularProgress /> : !loading && !error ? <AppWrapper /> : 'error'}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    byAllCases: state.byAllCases,
    byCountries: state.byCountries,
    loading: state.loading,
    error: state.error
  }
}

const mapDispatchStateToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(mapStateToProps, mapDispatchStateToProps)(App);
