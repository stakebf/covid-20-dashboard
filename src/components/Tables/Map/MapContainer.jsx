import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, CircleMarker, useMap } from 'react-leaflet'
import { makeStyles } from '@material-ui/core/styles';
import Legend from './Legend';
import MapProvider from './MapProvider';
import { getStatistics } from '../../../helpers/getStatistics';
import 'leaflet/dist/leaflet.css';
import './map.scss';

let index = 0;
const DEFAULT_LOCATION = [53.90033950661763, 27.562463259670654];
const ZOOM = 1.5;

const useStyles = makeStyles({
    mapContainer: {
        backgroundColor: '#000',
        margin: '0 auto',
        height: 'calc(100% - 100px)',
        width: '100%',
        gridColumn: '2'
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

function Map({ stat, cases, pickedCountry }) {
    const coords = Object.keys(pickedCountry).length ? [pickedCountry.countryInfo.lat, pickedCountry.countryInfo.long] : DEFAULT_LOCATION;
    const [isNewLocation, setIsNewLocation] = useState(false);

    useEffect(() => {
        setIsNewLocation(true);
    }, [pickedCountry]);

    const classes = useStyles();
    const fillOptions = (color) => {
        return {
            fillColor: color,
            color: color,
            fillOpacity: 0.5
        }
    };

    function getStaticticsValue(item) {
        const { category, timePeriod } = stat;
        const statType = category === 'confirmed' ? 'cases' : category.toString();
        let staticticValue = timePeriod.includes('today') ? item[`today${statType.charAt(0).toUpperCase() + statType.slice(1)}`] : item[statType];

        if (timePeriod.includes('100')) {
            staticticValue = getStatistics(staticticValue, item.population);
        }

        return staticticValue;
    };

    function renderProvinceMarker(item) {
        const { category, timePeriod } = stat;
        const center = [item.coordinates.latitude, item.coordinates.longitude];
        let staticticValue = getStaticticsValue(item);
        const backColor = getColor(staticticValue);
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
            radius={1 * 5}
            key={`${item.coordinates.latitude}_${++index}`}>
            <Popup>
                {`${category} ${timePeriod}`}:{item.stats[category]}
                <br />
                {pickedCountry.country}, {item.province}
            </Popup>
        </CircleMarker>
    };

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
            }}

            center={center}
            pathOptions={fillOptions(backColor)}
            radius={radius ? radius : 1 * 5}
            key={++index}>
            <Popup>
                {`${category} ${timePeriod}`}:{staticticValue}
                <br />
                {item.country}
            </Popup>
        </CircleMarker>
    };

    function FlyToLocation({ item, stat }) {
        const map = useMap();
        useEffect(() => {
            map.flyTo([item.countryInfo.lat, item.countryInfo.long], 5);
            setIsNewLocation(false);
        });

        return renderCountryMarker(item, stat, null, 10);
    };

    return (
        < MapContainer className={classes.mapContainer} center={coords} minZoom={1} zoom={ZOOM} scrollWheelZoom={true}>
            {Object.keys(pickedCountry).length && isNewLocation ? <FlyToLocation position={coords} item={pickedCountry} stat={stat} /> : null}
            <MapProvider />
            <TileLayer
                attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                subdomains='abcd'
                minZoom='0'
                maxZoom='20'
                url="https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.png"
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
