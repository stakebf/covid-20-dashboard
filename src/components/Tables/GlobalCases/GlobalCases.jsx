import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    backgroundColor: '#2c2c2c',
    gridRow: '1',
    gridColumn: '1/4',
    color: ' #fff3e9'

  },
  title: {
    fontSize: '1.5rem',
    color: 'red'
  },
  pos: {
    marginBottom: 12,
  },
  formContainer: {
    '& > *': {
      width: '25ch',
    },
  },
});

function GlobalCases({ byAllCases, casesType }) {

  const classes = useStyles();
  const [globalCases, setGlobalCases] = useState([]);

  useEffect(() => {
    setGlobalCases(byAllCases[casesType]);
  }, [byAllCases, casesType])

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            Global cases
        </Typography>
          <Typography variant="h5" component="h2">
            {globalCases}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    byAllCases: state.byAllCases,
    byCountries: state.byCountries,
    loading: state.loading
  }
}
export default connect(mapStateToProps)(GlobalCases);
export { GlobalCases }
