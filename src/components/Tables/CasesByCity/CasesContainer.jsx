import React, { useEffect, useState } from 'react';

import CasesItem from './CasesItem';
import SearchInput from '../GlobalCases/SearchInput'
import { List, Container, ListItem, ListItemText, Divider } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { connect } from 'react-redux';
import './cases.scss'

export function CasesContainer({ countries, title, newCases = [], setLocation, setCountry }) {
    const [cases, setCases] = useState(newCases);
    const [allCases, setAllCases] = useState(countries);
    const [sortingValue, setSort] = useState({
        parameter: 'country',
        typeCountry: 'descending',
        typeCases: 'descending',
    })

    useEffect(() => {
        if (cases.length === 0) {

            setAllCases(countries)
        }
    }, [cases, countries])

    function sortDown(parameter) {
        if (parameter === 'country') {
            setCases(cases.sort().reverse())
            setSort({
                ...sortingValue,
                parameter,
                typeCountry: 'ascending'
            })
        } else {
            setCases(cases.sort(function (a, b) {
                return b.cases - a.cases;
            }))
            setSort({
                ...sortingValue,
                parameter,
                typeCases: 'ascending'
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
            setSort({
                ...sortingValue,
                parameter,
                typeCountry: 'descending'
            })
        } else {
            setCases(cases.sort(function (a, b) {
                return a.cases - b.cases
            }))
            setSort({
                ...sortingValue,
                parameter,
                typeCases: 'descending'
            })
        }

    }

    function handleArrowClick(parameter, type) {
        if (type === 'descending') {
            sortDown(parameter)
        } else {
            sortUp(parameter)
        }
    }

    return (
        <Container className='cases__container'>
            <SearchInput cases={allCases} setNewCases={setCases} />
            <List className='cases__list'>
                <h2 className='cases__title'>{title}</h2>
                <ListItem className='cases__arrows' button>
                    <ListItemText className='cases__arrow-country arrow' onClick={() => {
                        handleArrowClick('country',  sortingValue.typeCountry)
                    }}>
                        {`Sort ${sortingValue.typeCountry}`}
                        {sortingValue.typeCountry === 'descending' && sortingValue.parameter === 'country' ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                    </ListItemText>
                    <ListItemText className='cases__arrow-number arrow' onClick={() => {
                        handleArrowClick('cases', sortingValue.typeCases)
                    }}>
                        {`Sort ${sortingValue.typeCases}`}
                        {sortingValue.typeCases === 'descending' && sortingValue.parameter === 'cases' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </ListItemText>
                </ListItem>
                <Divider />
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
