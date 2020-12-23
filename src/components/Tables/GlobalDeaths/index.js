import React from 'react';
import classes from './GloabalDeaths.module.scss';

import { List, ListItem, ListItemText, Divider } from '@material-ui/core';

const GloabalDeaths = () => {
  return (
    <div>
      <h2>Global Deaths</h2>
      <span>number</span>
      <List component="div" className={classes.root}>
        {countriesInfo.length && countriesInfo.map(({ country, deaths }) => {
          return (
            <div key={`${country}_${deaths}`}>
              <ListItem button>
                <ListItemText component="span">{deaths} deaths</ListItemText> 
                <ListItemText component="span">{country}</ListItemText>
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default GloabalDeaths;
