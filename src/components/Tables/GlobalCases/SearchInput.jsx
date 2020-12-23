import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    borderRadius: '25px',
  },
}));

export default function SearchInput({ cases, setNewCases }) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
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
