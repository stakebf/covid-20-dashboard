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
    '&>header': {
      color: '#fefeff',
      backgroundColor: '#222',
    },
  },
  tabTableItem: {
    width: '10%',
    fontSize: '0.7rem',
    padding: '2px'
  },
  mapTab : {
    justifyContent: 'space-around'
  }
}));

const GroupedTabs = ({ 
  statisticField = null, 
  setStatisticField = null, 
  tabValues, 
  type, 
styleClass }) => {
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
        >
          {tabValues.map((tab, idx) => <Tab className={classes[styleClass]} key={`${++tabIndex}_GroupedTabs`} label={tab} value={tab} {...a11yProps(idx)} />)}
        </Tabs>
      </AppBar>
    </div>
  );
}

export default GroupedTabs;
