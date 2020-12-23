import React from 'react';
import { connect } from 'react-redux';
import { setActiveCountry } from '../../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
    casesItem: {
        display: 'flex',
        flexDirection: 'row',
    },
    casesCountry: {
        flexGrow: 2,
        maxWidth: '50%',
        fontSize: '13px',
        paddingRight: '35px'
    },
    casesCount: {
        flexGrow: 1,
        fontSize: '13px',
        paddingRight: '35px'
    }

});

const CasesItem = ({ item, cases, country, setActiveCountry }) => {
    const classes = useStyles();
    const handleItemClick = () => {
        setActiveCountry(item);
    }

    return (
        <>
            <ListItem className={classes.casesItem} button onClick={() => {
                handleItemClick()
            }}>
                <ListItemText primary={country} className={classes.casesCountry} />
                <ListItemText primary={cases} className={classes.casesCount} />
            </ListItem>
            <Divider />
        </>
    );
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        setActiveCountry: (country) => dispatch(setActiveCountry(country))
    }
}

export default connect(null, mapDispatchStateToProps)(CasesItem);
