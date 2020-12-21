import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, Popup, CircleMarker, useMap } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
import Legend from './Legend'
import MapProvider from './MapProvider'
import { getStatistics } from '../../../helpers/getStatistics'
import 'leaflet/dist/leaflet.css'
import './map.scss'
import { Layer } from 'leaflet';
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
            console.log(e.target)
            map.locate()
        },
        focus(e) {
            console.log(e.target, 'HOVER')

        }

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
    }, [stat])

    const classes = useStyles();
    const fillOptions = (color) => {
        return {
            fillColor: color,
            color: color,
            fillOpacity: 0.5
        }
    }

    const onMarkerHover = (e) => {
        return {
            mouseover: (e) => {
                e.target.openPopup();
                console.log(e.target, 'marker hovered')

            },
        }
    }

    function getStaticticsValue(item) {
        const { category, timePeriod } = statictic;
        const statType = category === 'confirmed' ? 'cases' : category.toString();
        let staticticValue = timePeriod.includes('today') ? item[`today${statType.charAt(0).toUpperCase() + statType.slice(1)}`] : item[statType];
        if (timePeriod.includes('100')) staticticValue = getStatistics(staticticValue, item.population);
        return staticticValue;
    }

    function renderProvinceMarker(item, country) {
        const { category, timePeriod } = statictic;
        const center = [item.coordinates.latitude, item.coordinates.longitude];
        const backColor = getColor(item.stats[category]);

        //     let staticticValue = getStaticticsValue(item);
        //     const radius = (staticticValue / 10000000) * zoom;
        // //  console.log(staticticValue, item, 'DF;LBNJ;FLSBNF')
        //     const backColor = getColor(staticticValue);
        return <CircleMarker
            eventHandlers={{
                mouseover: (e) => {
                    e.target.openPopup();
                },
                mouseout: (e) => {
                    e.target.closePopup();
                }
            }}
            center={center}
            pathOptions={fillOptions(backColor)}
            radius={1 * zoom}
            key={`${item.coordinates.latitude}_${++index}`}
        >

            <Popup>
                {`${category} ${timePeriod}`}:{item.stats[category]}
                <br />
                {country}, {item.province}
            </Popup>
        </CircleMarker>
    }


    function renderCountryMarker(item, stat, idx, radius) {
        const { category, timePeriod } = stat;
        let staticticValue = getStaticticsValue(item);
        const center = [item.countryInfo.lat, item.countryInfo.long];
        const backColor = getColor(staticticValue);
        return <CircleMarker
            eventHandlers={{
                mouseover: (e) => {
                    e.target.openPopup();
                },
                mouseout: (e) => {
                    e.target.closePopup();
                }
            }} center={center} pathOptions={fillOptions(backColor)} radius={radius ? radius : 1 * zoom} key={++index}>
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
        <>
            <h1 onClick={(e) => {
                onMarkerHover()
            }} >Map</h1>
            <MapContainer onClick={(e) => console.log(e.target)} className={classes.mapContainer} center={newLocation} minZoom={1} zoom={zoom} scrollWheelZoom={true}>
                <MapEventHandler setZoom={setZoom} setIsNewLocation={setIsNewLocation} />
                {country !== null && isNewLocation ? <FlyToLocation position={newLocation} item={country} stat={statictic} /> : null}
                <MapProvider />
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {cases.map((item, idx) => {
                    if (item.provinces !== null) {
                        return item.provinces.map((provence) => renderProvinceMarker(provence, item.country))
                    }
                    return renderCountryMarker(item, stat, idx)

                })}
                <Legend />
            </MapContainer >
        </>

    )
}

export default React.memo(Map);
