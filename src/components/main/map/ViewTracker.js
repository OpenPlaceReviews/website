import React, {useEffect} from 'react';
import {useMap, useMapEvent} from "react-leaflet";
import L from "leaflet";

import storage from "../../../libs/storage";

export default function ViewTracker() {
    const map = useMap();

    useEffect(() => {
        try {
            const view = JSON.parse(storage.mapView || '');
            if (!!view) {
                map.setView(L.latLng(view.lat, view.lng), view.zoom);
            }
        } catch (e) {
            console.warn('Error while decoding saved view');
        }
    }, []);

    useMapEvent('moveend', () => {
        if (!!storage) {
            const view = {
                lat: map.getCenter().lat,
                lng: map.getCenter().lng,
                zoom: map.getZoom()
            };

            storage.mapView = JSON.stringify(view);
        }
    });

    return null;
}