import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import './map.scss'

// function TabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div
//             role="tabpanel"
//             hidden={value !== index}
//             id={`scrollable-auto-tabpanel-${index}`}
//             aria-labelledby={`scrollable-auto-tab-${index}`}
//             {...other}
//         >
//             {value === index && (
//                 <Box p={3}>
//                     <Typography>{children}</Typography>
//                 </Box>
//             )}
//         </div>
//     );
// }

// TabPanel.propTypes = {
//     children: PropTypes.node,
//     index: PropTypes.any.isRequired,
//     value: PropTypes.any.isRequired,
// };

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

export default function MapTabContainer({ statisticField, setStatisticField }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(statisticField);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setStatisticField(newValue)
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
                    // className={{selected: classes.selected}}
                >
                    <Tab label="confirmed" value="confirmed" {...a11yProps(0)} />
                    <Tab label="deaths" value="deaths" {...a11yProps(1)} />
                    <Tab label="recovered" value="recovered" {...a11yProps(2)} />
                    {/* <Tab label="Item Four" {...a11yProps(3)} />
                    <Tab label="Item Five" {...a11yProps(4)} />
                    <Tab label="Item Six" {...a11yProps(5)} />
                    <Tab label="Item Seven" {...a11yProps(6)} /> */}
                </Tabs>
            </AppBar>
        </div>
    );
}