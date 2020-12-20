import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
// import Map from '../Map/MapContainer'

const useStyles = makeStyles({
    casesItem: {
        display: 'flex',
        flexDirection: 'row'
    },
    casesCountry: {
        flexGrow: 2,
        maxWidth: '50%',
    },
    casesCount: {
        flexGrow: 1
    }

});

export default function CasesItem({ item, cases, country, coordinates, setLocation, setCountry }) {
    const classes = useStyles();
    const handleItemClick = (coordinates) => {
        setLocation(coordinates)
        setCountry(item)
    }

    return (
        <>
            <ListItem className={classes.casesItem} button onClick={() => {
                handleItemClick(coordinates)
            }}>
                <ListItemText primary={country} className={classes.casesCountry} />
                <ListItemText primary={cases} className={classes.casesCount} />
            </ListItem>
            <Divider />
        </>
    );
}

// GlobalCases.propTypes = {
//     total: PropTypes.number.isRequired,
// };