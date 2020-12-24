import React from 'react';
import { connect } from 'react-redux';
import { setActiveCountry, fetchHistorcalDataByCountry } from '../../../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemAvatar, ListItemText, Divider, Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    casesItem: {
        display: 'grid',
        flexDirection: 'row',
        gridAutoFlow: 'column',
        gridTemplateColumns: '2fr 1fr 1fr',
    },
    casesCountry: {
        flexGrow: 2,
        maxWidth: '50%',
        fontSize: '13px',
        paddingRight: '35px',
        '&>span': {
            fontSize: '14px',
            fontWeight: 'bold',
        }
    },
    casesCount: {
        color: 'red',
        flexGrow: 1,
        fontSize: '13px',
        paddingRight: '35px',
        '&>span': {
            fontSize: '14px',
            fontWeight: 'bold',
        }
    },
    avatar: {
        width: '25px',
        height: '25px',
        minWidth: '25px',
        justifySelf: 'self-end'
    }

});

const CasesItem = ({ item, cases, country, setActiveCountry, fetchHistorcalDataByCountry }) => {
    const classes = useStyles();
    const handleItemClick = () => {
        setActiveCountry(item);
        fetchHistorcalDataByCountry(item.country);
    }

    const style = {
        fontSize: '13px'
    }
    return (
        <>
            <ListItem className={classes.casesItem} button onClick={() => {
                handleItemClick()
            }}>
                <ListItemText style={style} primary={country} className={classes.casesCountry} />
                <ListItemText primary={cases} className={classes.casesCount} />
                <ListItemAvatar className={classes.avatar}>
                    <Avatar alt="Country flag" src={item.countryInfo.flag} className={classes.avatar} />
                </ListItemAvatar>
            </ListItem>
            <Divider />
        </>
    );
}

const mapDispatchStateToProps = (dispatch) => {
    return {
        setActiveCountry: (country) => dispatch(setActiveCountry(country)),
        fetchHistorcalDataByCountry: (country) => dispatch(fetchHistorcalDataByCountry(country))
    }       
}

export default connect(null, mapDispatchStateToProps)(CasesItem);
