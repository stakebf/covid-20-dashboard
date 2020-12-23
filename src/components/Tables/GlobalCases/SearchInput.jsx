import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import KeyboardView from '../../Keyboard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '25px',
    '&>label': {
      color: '#fefeff',
    },
    '&>fieldset': {
      backgroundColor: '#fefeff'
    }
  },
}));

export default function SearchInput({ cases, setNewCases }) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const countries = cases;

  const handleChange = event => {
    setSearchTerm(event.target.value.toLowerCase());
    console.log(searchTerm, 'searchTerm');
  };

  useEffect(() => {
    const results = countries.filter(country =>
      country.country.toLowerCase().includes(searchTerm)
    );
    setNewCases(results);
  }, [countries, searchTerm, setNewCases]);

  useEffect(() => {
    KeyboardView.render(setSearchTerm, searchTerm);
  }, []);

  return (
    <form className={classes.formContainer} noValidate autoComplete="off">
      <TextField className={classes.root} id="outlined-basic" label="Enter city" variant="outlined"
        onChange={(e) => {
          handleChange(e)
        }}
        onKeyPress={(e) => {
          if (e.code === 'Enter') e.preventDefault();
        }
        } />
    </form>
  );
}
