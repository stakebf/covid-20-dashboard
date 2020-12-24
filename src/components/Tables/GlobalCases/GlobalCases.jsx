import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import './global.scss'


function GlobalCases({ byAllCases, casesType }) {
  const [globalCases, setGlobalCases] = useState([]);

  useEffect(() => {
    setGlobalCases(byAllCases[casesType]);
  }, [byAllCases, casesType])

  return (
    <>
      <Card className={'global__container'}>
        <CardContent>
          <Typography className={'global__title'} gutterBottom>
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
