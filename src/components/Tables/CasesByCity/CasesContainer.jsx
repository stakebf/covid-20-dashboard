import React, { useEffect, useState } from 'react';

import CasesItem from './CasesItem';
// import PropTypes from 'prop-types';
import SearchInput from '../GlobalCases/SearchInput'
import { List, Container } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { connect } from 'react-redux';
import './cases.scss'

export function CasesContainer({ countries, title, newCases = [], setLocation, setCountry }) {
    const [cases, setCases] = useState(newCases);
    const [allCases, setAllCases] = useState(countries);
    const [sortingValue, setSort] = useState({
        parameter: 'country',
        type: 'ascending'
    })

    useEffect(() => {
        setCases(countries);
    }, [countries])

    useEffect(() => {
        if (cases.length === 0) {

            setAllCases(countries)
        }
    }, [cases, countries])

    useEffect(() => {

    }, [sortingValue])

    function sortDown(parameter) {
        if (parameter === 'country') {
            setCases(cases.sort().reverse())
            setSort({
                ...sortingValue,
                type: 'descending'
            })
        } else {
            setCases(cases.sort(function (a, b) {
                return b.cases - a.cases;
            }))
            setSort({
                ...sortingValue,
                type: 'descending'
            })
        }

    }

    function sortUp(parameter) {
        if (parameter === 'country') {

            setCases(cases.sort(function (a, b) {
                var nameA = a.country.toLowerCase(), nameB = b.country.toLowerCase()
                if (nameA < nameB)
                    return -1
                if (nameA > nameB)
                    return 1
                return 0
            }))
            console.log(cases, 'SORTuP')
            setSort({
                ...sortingValue,
                type: 'ascending'
            })
        } else {
            setCases(cases.sort(function (a, b) {
                return a.cases - b.cases
            }))
            setSort({
                ...sortingValue,
                type: 'ascending'
            })
        }

    }

    // const classes = useStyles();
    return (
        <Container>
            <SearchInput cases={allCases} setNewCases={setCases} />
            <List className='cases__list'>
                <h2 className='cases__title'>{title}</h2>
                {sortingValue.type === 'ascending' ? <KeyboardArrowDownIcon onClick={() => sortDown('country')} /> : <KeyboardArrowUpIcon onClick={() => sortUp('country')} />}
                {sortingValue.type === 'ascending' ? <KeyboardArrowDownIcon onClick={() => sortDown('cases')} /> : <KeyboardArrowUpIcon onClick={() => sortUp('cases')} />}
               
                {cases.map((item, idx) =>
                (<CasesItem item={item} cases={item.cases} country={item.country} key={`${idx}_${item.country}`} setCountry={setCountry} setLocation={setLocation} coordinates={[item.countryInfo.lat, item.countryInfo.long]} />
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
