import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CasesItem from './CasesItem';
// import PropTypes from 'prop-types';
import SearchInput from '../GlobalCases/SearchInput'
import { List, Container } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    casesList: {
        maxWidth: 275,
        backgroundColor: 'beige',
        maxHeight: '85vh',
        overflowY: 'scroll'
    },
    title: {
        fontSize: 14,
    },
});

export function CasesContainer({ countries, title, newCases = [], setLocation }) {
    const [cases, setCases] = useState(newCases);
    const [allCases, setAllCases] = useState(countries);

    useEffect(() => {
        setCases(countries);
    }, [countries])

    useEffect(() => {
        if (cases.length === 0) {

            setAllCases(countries)
        }
    }, [cases, countries])


    const classes = useStyles();
    return (
        <Container>
            <SearchInput cases={allCases} setNewCases={setCases} />
            <List className={classes.casesList}>
                <h2 className={classes.title}>{title}</h2>
                {cases.map((item, idx) =>
                (<CasesItem cases={item.cases} country={item.country} key={idx} setLocation={setLocation} coordinates={[item.countryInfo.lat, item.countryInfo.long]} />
                )
                )}
            </List>
        </Container>
    );
}


const mapStateToProps = (state) => {
    return {
        byAllCases: state.byAllCases,
        byCountries: state.byCountries,
        loading: state.loading
    }
}


// GlobalCases.propTypes = {
//   total: PropTypes.number.isRequired,
// };
export default connect(mapStateToProps)(CasesContainer);
