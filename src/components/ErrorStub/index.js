import React from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../redux/actions';
import classes from './ErrorStub.module.scss';

const ErrorStub = ({ fetchData }) => {
  return (
    <div className={classes.stub}>
      Something went wrong. Please reload page or press the button.
      <button 
        type="button"
        onClick={() => {
          fetchData();
        }}  
      >Refresh</button>
    </div>
  );
};

const mapDispatchStateToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(null, mapDispatchStateToProps)(ErrorStub);
