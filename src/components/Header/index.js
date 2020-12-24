import React from 'react';
import { connect } from 'react-redux';

import classes from './Header.module.scss';

const Header = ({ byAllCases }) => {
  console.log(byAllCases);
  const date = `${new Date(byAllCases.updated).toDateString()} ${new Date(byAllCases.updated).toLocaleTimeString()}`;
  return (
    <header className={classes.header}>
      <h1>COVID-20 Dashboard</h1>
      <span>Last update: {!Object.keys(byAllCases).length ? new Date().toDateString() : date}</span>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    byAllCases: state.byAllCases
  }
}

export default connect(mapStateToProps)(Header);
