import React from 'react';
import { connect } from 'react-redux';
import { setActiveCountry } from '../../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, ListItemText, Divider, Avatar } from '@material-ui/core';

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
    },
    avatar: {
        width: '25px',
        height: '25px'
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
                <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={item.countryInfo.flag} className={classes.avatar}/>
                </ListItemAvatar>
                <ListItemText primary={country} className={classes.casesCountry}>
                </ListItemText>
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
