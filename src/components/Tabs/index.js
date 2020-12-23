import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import './Tabs.scss';

const a11yProps = (index) => {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

let tabIndex = 0;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    '&$selected': {
      color: ' #fefeff',
      backgroundColor: ' #153468',
    }
  },
  tab: {
    color: 'red',
    '&::selection': {
      color: ' #fefeff',
      backgroundColor: ' #153468',
    }
  },
  selected: {
    color: ' #fefeff',
    backgroundColor: ' #153468',
  },
  '&$selected': {
    color: ' #fefeff',
    backgroundColor: ' #153468',
  },
  tabItem: {
    width: '10%'
  }
}));

const GroupedTabs = ({ 
  statisticField = null, 
  setStatisticField = null, 
  tabValues, 
  type }) => {
  const classes = useStyles();
  const [value, setValue] = useState(statisticField[type]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStatisticField({
      ...statisticField,
      [type]: newValue
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          // aria-label="scrollable auto tabs example"
        >
          {tabValues.map((tab, idx) => <Tab className={classes.tabItem} key={`${++tabIndex}_GroupedTabs`} label={tab} value={tab} {...a11yProps(idx)} />)}
        </Tabs>
      </AppBar>
    </div>
  );
}

export default GroupedTabs;
