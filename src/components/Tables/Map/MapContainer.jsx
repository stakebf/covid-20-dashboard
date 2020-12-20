import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Popup, CircleMarker, useMap } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
import Legend from './Legend'
import MapProvider from './MapProvider'
import 'leaflet/dist/leaflet.css'
import './map.scss'
// import classes from './MapContainer.module.scss';


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


    const classes = useStyles();
    const fillOptions = (color) => {
        return {
            fillColor: color,
            color: color,
            fillOpacity: 0.5
        }
    }


    function renderProvinceMarker(item) {
        const center = [item.coordinates.latitude, item.coordinates.longitude];
        const radius = (item.stats[stat] / 10000000) * zoom;
        const backColor = getColor(item.stats[stat]);
        return <CircleMarker center={center} pathOptions={fillOptions(backColor)} radius={1 * zoom}>
            <Popup>
                {stat}:{item.stats.stat}
                <br />
                {item.country}, {item.province}, {item.county}
            </Popup>
        </CircleMarker>
    }


    function renderCountryMarker(item, stat, idx, radius) {
        const statType = stat === 'confirmed' ? 'cases' : stat.toString();
        const center = [item.countryInfo.lat, item.countryInfo.long];
        // const radius = item[statType] / 10000000;
        const backColor = getColor(item[statType]);
        console.log(zoom)
        return <CircleMarker center={center} pathOptions={fillOptions(backColor)} radius={radius ? radius : 1 * zoom} key={idx ? idx : item[statType]}>
            <Popup>
                {statType}:{item[statType]}
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
            {console.log(isNewLocation, 'isNewLocation')}
            {country !== null && isNewLocation ? <FlyToLocation position={newLocation} item={country} stat={stat} /> : null}
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