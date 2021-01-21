import React, {useEffect, useState} from 'react';

import {getObjectsById} from "../../../api/data";
import {useMap, useMapEvent} from "react-leaflet";

import BlockExpandable from "./BlockExpandable";
import {Button, Link} from "@material-ui/core";

let refreshTimeout = null;
let isMapMoving = false;
const REFRESH_TIMEOUT = 300;

export default function ReviewPlaces({setMarker, reload}) {
    const [markers, setMarkers] = useState([]);
    const [bounds, setBounds] = useState(null);

    const map = useMap();

    const onMapChange = () => {
        setBounds(map.getBounds());
    };

    useEffect(() => {
        onMapChange();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const layers = [];
            const features = [];
            const bounds = map.getBounds();

            map.eachLayer((layer) => {
                if(layer instanceof L.Marker) {
                    if(bounds.contains(layer.getLatLng())) {
                        if (layer.options && layer.options.properties) {
                            layers.push(layer);
                        }
                    }
                }
            });

            if(layers.length) {
                const requests = layers.map((layer) => getObjectsById('opr.place', layer.options.properties.opr_id));
                const blocks = await Promise.all(requests);

                layers.forEach((layer, index) => {
                    const {properties} = layer.options;
                    if (properties) {
                        const {objects} = blocks[index];
                        const [block] = objects;
                        if (block && block.images && block.images.review) {
                            const feature = {
                                geometry: {
                                    coordinates: layer.getLatLng(),
                                },
                                properties: {
                                    ...properties,
                                    block,
                                }
                            };

                            features.push(feature);
                        }
                    }
                });
            }

            if (!isMapMoving) {
                setMarkers(features);
            }
        };

        if (bounds) {
            fetchData();
        }
    }, [bounds, reload]);

    useMapEvent('moveend', () => {
        clearTimeout(refreshTimeout);
        refreshTimeout = setTimeout(() => {
            onMapChange();
            isMapMoving = false;
        }, REFRESH_TIMEOUT);
    });

    useMapEvent('movestart', () => {
        isMapMoving = true;
    });

    const handleListClick = (marker) => {
        setMarker(marker);
    };

    return <BlockExpandable open={true} header={`Places to review (${markers.length})`}>
        <ul>
            {markers.map((marker, index) => {
                const {title} = marker.properties;
                return <li key={index}>
                    <Link component={Button} onClick={() => handleListClick(marker)}>{title}</Link>
                </li>
            })}
        </ul>
    </BlockExpandable>;
};