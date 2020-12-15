import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/actions';


import classes from './App.module.scss';

function App({ byAllCases, byCountries, fetchData, loading }) {
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log(byAllCases, byCountries);

  return (
    <div className={classes.app}>
      {loading && <CircularProgress />}
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
