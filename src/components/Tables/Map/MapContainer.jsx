import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Popup, CircleMarker, useMap } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
import Legend from './Legend'
import MapProvider from './MapProvider'
import { getStatistics } from '../../../helpers/getStatistics'
import 'leaflet/dist/leaflet.css'
import './map.scss'
// import classes from './MapContainer.module.scss';

let index = 0;

const useStyles = makeStyles({
    mapContainer: {
        backgroundColor: 'beige',
        margin: '0 auto',
        marginBottom: '50px',
        height: '80vh',
        width: '100%'
    },
    title: {
        fontSize: 14,
    },
});

const getColor = num => {
    return num > 1000000
        ? "#BD0026"
        : num > 500000
            ? "#E31A1C"
            : num > 100000
                ? "#FC4E2A"
                : num > 50000
                    ? "#FD8D3C"
                    : num > 10000
                        ? "#FEB24C"
                        : num > 1000
                            ? "#dfdc15"
                            : "#4ddb0b";
}

function MapEventHandler({ setZoom, setIsNewLocation }) {
    const map = useMapEvents({
        zoomlevelschange(e) {
            setIsNewLocation(false)
        },
        zoomend(e) {
            setZoom(map.getZoom())
        },
        click(e) {
            map.locate()
        },
        // locationfound(e) {
        //     console.log(e, 'LOCATION E', e.latlng)
        //     map.flyTo([13.87992, 45.9791], map.getZoom())
        // }

    })
    return null
}



function Map({ stat, byCountries, location, pickedCountry }) {
    const [cases, setAllCases] = useState([]);
    const [newLocation, setLocation] = useState(location);
    const [country, setPickedCountry] = useState(pickedCountry);
    const [zoom, setZoom] = useState(1.5);
    const [isNewLocation, setIsNewLocation] = useState(false);
    const [statictic, setStatistic] = useState(stat)

    useEffect(() => {
        setAllCases(byCountries);
    }, [byCountries])

    useEffect(() => {
        setLocation(location)
        setPickedCountry(pickedCountry)
    }, [location, newLocation, country, pickedCountry])


    useEffect(() => {
        setIsNewLocation(true)
    }, [pickedCountry])

    useEffect(() => {
        setStatistic(stat)
    // console.log(stat, statictic, 'STAT STATISTIC')
    }, [stat])

    const classes = useStyles();
    const fillOptions = (color) => {
        return {
            fillColor: color,
            color: color,
            fillOpacity: 0.5
        }
    }

    function getStaticticsValue(item) {
        const { category, timePeriod } = statictic;
        const statType = category === 'confirmed' ? 'cases' : category.toString();
        // console.log(`today${statType.charAt(0).toUpperCase() + statType.slice(1)}`, item, 'INTO GETsTA' )

        let staticticValue = timePeriod.includes('today') ? item[`today${statType.charAt(0).toUpperCase() + statType.slice(1)}`] : item[statType];
        if (timePeriod.includes('100')) staticticValue = getStatistics(staticticValue, item.population);
        return staticticValue;
    }

    function renderProvinceMarker(item) {
        const { category, timePeriod } = statictic;

        const center = [item.coordinates.latitude, item.coordinates.longitude];
        let staticticValue = getStaticticsValue(item);
        const radius = (staticticValue / 10000000) * zoom;
    //  console.log(staticticValue, item, 'DF;LBNJ;FLSBNF')
        const backColor = getColor(staticticValue);
        return <CircleMarker center={center} pathOptions={fillOptions(backColor)} radius={1 * zoom} key={`${item.coordinates.latitude}_${++index}`}>
            <Popup>
                {`${category} ${timePeriod}`}:{staticticValue}
                <br />
                {item.country}, {item.province}, {item.county}
            </Popup>
        </CircleMarker>
    }


    function renderCountryMarker(item, stat, idx, radius) {
        const { category, timePeriod } = stat;
        // const statType = category === 'confirmed' ? 'cases' : category.toString();
        let staticticValue = getStaticticsValue(item);

        const center = [item.countryInfo.lat, item.countryInfo.long];
        // const radius = item[statType] / 10000000;
        const backColor = getColor(staticticValue);
        // console.log(item)
        return <CircleMarker center={center} pathOptions={fillOptions(backColor)} radius={radius ? radius : 1 * zoom} key={++index}>
            <Popup>
                {`${category} ${timePeriod}`}:{staticticValue}
                <br />
                {item.country}
            </Popup>
        </CircleMarker>
    }

    function FlyToLocation({ position, item, stat }) {
        const map = useMap();
        map.flyTo([item.countryInfo.lat, item.countryInfo.long], 5)
        return renderCountryMarker(item, stat, null, 10)
    }


    return (
        < MapContainer className={classes.mapContainer} center={newLocation} minZoom={1} zoom={zoom} scrollWheelZoom={true}>
            <MapEventHandler setZoom={setZoom} setIsNewLocation={setIsNewLocation} />
            {country !== null && isNewLocation ? <FlyToLocation position={newLocation} item={country} stat={statictic} /> : null}
            <MapProvider />

            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {cases.map((item, idx) => {
                if (item.provinces !== null) {
                    return item.provinces.map((provence) => renderProvinceMarker(provence))
                }
                return renderCountryMarker(item, stat, idx)

            })}
            <Legend />
        </MapContainer >
    )
}

export default React.memo(Map);
