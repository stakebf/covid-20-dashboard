import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import KeyboardView from '../../Keyboard';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '25px',
    color: '#fefeff',
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
  const [placeholder, setPlaceholder] = useState("Enter city");

  const countries = cases;

  const handleChange = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const results = countries.filter(country =>
      country.country.toLowerCase().includes(searchTerm)
    );
    setNewCases(results);
  }, [countries, searchTerm, setNewCases]);

  useEffect(() => {
    KeyboardView.render(setSearchTerm, searchTerm);
  }, [searchTerm]);

  return (
    <form className={classes.formContainer} noValidate autoComplete="off">
      <TextField className={classes.root} id="outlined-basic" label={placeholder} variant="outlined"
        onChange={(e) => {
          handleChange(e)
        }}
        onBlur={()=> {
          setPlaceholder(searchTerm)
        }}
        onKeyPress={(e) => {
          if (e.code === 'Enter') e.preventDefault();
        }
        } />
    </form>
  );
}
