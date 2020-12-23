import React, { useState } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

import GroupedTabs from '../../Tabs';
import tabsNames from '../../../models/tabsNames';
import { getInfoAboutCountry } from '../../../helpers/getInfoAboutCountry';

import classes from './AllKindsOfCases.module.scss';

const AllKindsOfCases = ({ activeCountry, byAllCases }) => {
  const [statisticField, setStatisticField] = useState({
    category: 'confirmed',
    timePeriod: 'total'
  });

  const { countryName, currentData} = getInfoAboutCountry(statisticField, activeCountry, byAllCases);

  console.log(activeCountry, 'activeCountry');
  console.log(statisticField, 'statisticField');

  return (
    <section className={classes.table2__container}>
      <h2>Table with confirmed / deaths / recovered cases</h2>
      <List component="div" className={classes.root}>
        <ListItem button>
          <ListItemText component="span">{countryName}</ListItemText> 
          <ListItemText component="span">{currentData}</ListItemText>
        </ListItem>
        <Divider />
      </List>
      <GroupedTabs 
      className={classes.table2__container}
        type={'category'}
        country={activeCountry}
        setStatisticField={setStatisticField} 
        statisticField={statisticField} 
        tabValues={tabsNames.mainCategories} 
      />
      <GroupedTabs 
        type={'timePeriod'} 
        country={activeCountry} 
        setStatisticField={setStatisticField} 
        statisticField={statisticField} 
        tabValues={tabsNames.timeCategories} 
      />
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    byAllCases: state.byAllCases,
    activeCountry: state.activeCountry
  }
}

export default connect(mapStateToProps)(AllKindsOfCases);
