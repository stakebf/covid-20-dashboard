import { useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import classes from './MapContainer.module.scss';

const Legend = () => {
    const map = useMap();
    console.log(map);

    useEffect(() => {
        const getColor = num => {
            console.log(num > 10000, num, '800026')
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

        const legend = L.control({ position: "bottomright" });

        legend.onAdd = () => {
            const div = L.DomUtil.create("div", "info legend");
            const grades = [0, 1000, 10000, 50000, 100000, 500000, 1000000];
            let labels = [];
            let from;
            let to;

            for (let i = 0; i < grades.length; i++) {
                from = grades[i];
                to = grades[i + 1];
                labels.push(
                    `<div class=${classes.label__item}><span style="background:${getColor(from + 1)}" class=${classes.label__color}></span><span> ${to ? to : +grades[i]}</span></div>`
                );
            }
            div.innerHTML = labels.join("<br>");
            return div;
        };

        legend.addTo(map);
    }, []);
    return null;
};

export default Legend;
