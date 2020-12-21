/*
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './map.scss'


function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        '&$selected': {
            color: ' #fefeff',
            backgroundColor: ' #153468',
        }
    },

    tab: {
        color: 'red',
        '&::selection': {
            color: ' #fefeff',
            backgroundColor: ' #153468',
        }
    },

    selected: {
        color: ' #fefeff',
        backgroundColor: ' #153468',
    },

    '&$selected': {
        color: ' #fefeff',
        backgroundColor: ' #153468',
    }

}));

export default function MapTabContainer({ statisticField, setStatisticField, tabValues, type }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(statisticField[type]);

    const handleChange = (event, newValue) => {
        console.log(newValue, 'newValue')
        setValue(newValue);
        setStatisticField(
            {
                ...statisticField,
                [type]: newValue
            })
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tabValues.map((tab, idx) => <Tab label={tab} value={tab} {...a11yProps(idx)} />)}
                </Tabs>
            </AppBar>
        </div>
    );
}
*/
