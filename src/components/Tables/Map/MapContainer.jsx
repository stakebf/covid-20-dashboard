import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, CircleMarker } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
// import { byCountryAll, byCountryUsa } from '../../byCountry';
import Legend from './Legend'
import 'leaflet/dist/leaflet.css'
import './map.css'
// import classes from './MapContainer.module.scss';


const useStyles = makeStyles({
    mapContainer: {
        backgroundColor: 'beige',
        margin: '0 auto',
        marginBottom: '50px',
        height: '80vh',
        width: '80vw'
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


// function LocationMarker() {
//     const [position, setPosition] = useState(null)
//     const map = useMapEvents({
//         click(e) {
//             console.log(e);
//             map.locate()
//         },
//         locationfound(e) {
//             console.log(e)
//             setPosition(e.latlng)
//             map.flyTo(e.latlng, map.getZoom())
//         },

//         zoomlevelschange(e) {

//         }

//     })



//     return position === null ? null : (
//         <Marker position={position}>
//             <Popup>You are here</Popup>
//         </Marker>
//     )
// }

function MyComponent() {
    const map = useMapEvents({
        zoomlevelschange(e) {
            console.log(e, 'MAP E')
        }
    })
    return null
}

function FlyToLocation(position) {
    const map = useMapEvents({
        locationfound(e) {
            map.flyTo(position, map.getZoom())
        }
    })
    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default function Map({ stat, byAllCases, byCountries }) {
    const [cases, setAllCases] = useState([]);
    const [casesUSA, setUSACases] = useState([]);
    const [location, setLocation] = useState([39.6745567899274, -20.190688951235135]);
    const [zoom, setZoom] = useState(1)

    // const [currentPosition, setPosition] = useState([51.505, -0.09])

    useEffect(() => {
        setAllCases(byCountries);
        setUSACases(byCountries)
        console.log(byAllCases, byCountries, 'byAllCases, byCountries')
    }, [byCountries])

    // useEffect(() => {
    //     console.log(newLocation)

    // }, [newLocation])
    // useEffect(() => {
    //     console.log(newLocation)

    // }, [])

    const classes = useStyles();
    // const center = [51.505, -0.09]
    const fillOptions = (color) => {
        return {
            fillColor: color,
            color: color,
            fillOpacity: 0.5
        }
    }


    function renderProvinceMarker(item) {
        const center = [item.coordinates.latitude, item.coordinates.longitude];
        const radius = item.stats[stat] / 100000;
        const backColor = getColor(item.stats[stat]);
        return <CircleMarker center={center} pathOptions={fillOptions(backColor)} radius={radius}>
            <Popup>
                {stat}:{item.stats.stat}
                <br />
                {item.country}, {item.province}, {item.county}
            </Popup>
        </CircleMarker>
    }



    return (
        < MapContainer className={classes.mapContainer} center={location} minZoom={1} zoom={1.5} scrollWheelZoom={true}>
            <MyComponent />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {cases.map((item, idx) => {
                if (item.provinces !== null) {
                   return item.provinces.map((provence) => renderProvinceMarker(provence))
                }
                const statType = stat === 'confirmed' ? 'cases' : stat;
                const center = [item.countryInfo.lat, item.countryInfo.long];
                const radius = item[statType] / 1000000;
                const backColor = getColor(item[statType]);
                return <CircleMarker center={center} pathOptions={fillOptions(backColor)} radius={radius} key={idx}>
                    <Popup>
                        {statType}:{item[statType]}
                        <br />
                        {item.country}
                    </Popup>
                </CircleMarker>

            })}
            <Legend />
        </MapContainer >
    )

}