import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

import {fetchData} from "../api/geo";

import ServiceLayer from "./map/ServiceLayer";
import GeoGSONLayer from "./map/GeoGSONLayer";

export default () => {
  const [isTileBased, setTileBased] = useState(false);
  const [currentBounds, setCurrentBounds] = useState({});
  const [currentLayer, setCurrentLayer] = useState({});
  const [placesCache, setPlacesCahe] = useState({
    "" : {
      data: {
        "type":"FeatureCollection",
        "features":[]
      }
    }
  });

  useEffect(() => {
    const request = async () => {
      const {tileBased, geo: data} = await fetchData();
      setTileBased(tileBased);
      setPlacesCahe({ "": { data }});
    };

    request();
  }, []);

  return <>
    <MapContainer center={[40, -35]} zoom={4}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
        url="https://tile.osmand.net/{z}/{x}/{y}.png"
        id="tiles"
      />

      <ServiceLayer
        currentBounds={currentBounds}
        currentLayer={currentLayer}
        setLayer={setCurrentLayer}
        setBounds={setCurrentBounds}
        placesCache={placesCache}
        setPlaces={setPlacesCahe}
        isTileBased={isTileBased}
      />

      <GeoGSONLayer data={currentLayer}/>
    </MapContainer>
  </>;
}
