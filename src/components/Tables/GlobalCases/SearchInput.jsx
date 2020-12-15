import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields({ cases, setNewCases }) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const countries = cases;

  const handleChange = event => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  useEffect(() => {
    const results = countries.filter(country =>
      country.Country.toLowerCase().includes(searchTerm)
    );
    setNewCases(results);
  }, [searchTerm]);
  
  return (
    <form className={classes.formContainer} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="Enter city" variant="outlined" onChange={handleChange} />
    </form>
  );
}
