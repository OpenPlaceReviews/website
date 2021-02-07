import React from 'react';
import {useMap, useMapEvent} from "react-leaflet";
import storage from "../../libs/storage";

export default function ViewTracker({
  whenMoved
}) {
    const map = useMap();

    useMapEvent('moveend', () => {
        if (!!storage) {
            const view = {
                lat: map.getCenter().lat,
                lng: map.getCenter().lng,
                zoom: map.getZoom()
            };
            storage.mapView = JSON.stringify(view);
        }
        whenMoved(map);
    });

    return null;
}