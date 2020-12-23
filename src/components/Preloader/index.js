import React from 'react';
import { CircularProgress } from '@material-ui/core';

import classes from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={classes.wrapper}>
      <CircularProgress style={{'color': 'white'}}/>
    </div>
  );
};

export default Preloader;
