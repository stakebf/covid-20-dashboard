import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, CircleMarker, useMap, GeoJSON } from 'react-leaflet'
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

function MyComponent(mapContainer) {
    const map = useMapEvents({
        zoomlevelschange(e) {
            console.log(e, 'MAP E')
        },
        click(e) {
            map.locate()
        },
        update(e) {
            console.log(e, 'update')
        },
        baselayerchange(e){
            console.log(e, 'baselayerchange')

        }, 
        load(e) {
            console.log(e, 'load')
        },
        // locationfound(e) {
        //     console.log(e, 'LOCATION E', e.latlng)
        //     map.flyTo([13.87992, 45.9791], map.getZoom())
        // }

    })
    return null
}

function FlyToLocation({position}) {
    const map = useMap();
    console.log(position, 'position', map)
    map.flyTo(position, 12)

    // const map = useMapEvents({
    //     locationfound(e) {
    //         console.log(e, 'LOCATION E', e.latlng)
    //         map.flyTo(e.latlng, map.getZoom())
    //     }
    // })
    return null;
}
// const Map = React.forwardRef((props, ref) => {
//     return <MapElement  {...props} ref={ref}/>
// })
const Map = React.forwardRef(({ stat, byAllCases, byCountries, location }, ref) => {
    const [cases, setAllCases] = useState([]);
    const [casesUSA, setUSACases] = useState([]);
    const [newLocation, setLocation] = useState(location);
    const [zoom, setZoom] = useState(1)
    const mapContainer = useRef(ref);

    useEffect(() => {
        setAllCases(byCountries);
        setUSACases(byCountries)
    }, [byCountries])

    useEffect(() => {
        setLocation(location)
    }, [location, newLocation])


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
        < MapContainer className={classes.mapContainer} center={newLocation} minZoom={1} zoom={1.5} scrollWheelZoom={true}>
            <MyComponent/>
            <FlyToLocation position={newLocation} />
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
)

// }
export default Map;