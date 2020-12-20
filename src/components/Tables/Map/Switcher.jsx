import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

export default function Switcher({setStat}) {
  const [value, setValue] = React.useState('confirmed');

  const handleChange = (event) => {
      console.log(event.target.value)
    setStat(event.target.value, event.target)
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Statistics</FormLabel>
      <RadioGroup aria-label="statistics" name="statistics" value={value} onChange={handleChange}>
        <FormControlLabel value="confirmed" control={<Radio />} label="Total Confirmed"/>
        <FormControlLabel value="deaths" control={<Radio />} label="Total Deaths" />
        <FormControlLabel value="recovered" control={<Radio />} label="Total Recovered" />
      </RadioGroup>
    </FormControl>
  );
}