import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { fetchData } from "../../../api/geo";

import OPRLayer from "./OPRLayer";
import MapSidebar from "./MapSidebar";

import StatusBar from "./StatusBar";
import Filter from "./Filter";
import ViewTracker from "./ViewTracker";
import OPRAttributesBar from "./OPRAttributesBar";

const OPRStatusBar = React.memo(StatusBar);
const OPRMarkersFilter = React.memo(Filter);

export default () => {
  const [placeTypes, setPlaceTypes] = useState({});
  const [status, setStatus] = useState('Loading data...');
  const [filterVal, setFilter] = useState('all');
  const [isTileBased, setTileBased] = useState(false);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const request = async () => {
      const {tileBased, placeTypes} = await fetchData();
      setTileBased(tileBased);
      setPlaceTypes(placeTypes);
    };

    request();
  }, []);

  return <MapContainer center={[40, -35]} zoom={4} zoomControl={false}>
    <TileLayer
      attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
      url="https://tile.osmand.net/{z}/{x}/{y}.png"
      id="tiles"
    />
    <ViewTracker/>
    <MapSidebar>
      <div className="leaflet-bar leaflet-control map-sidebar">
        <OPRMarkersFilter placeTypes={placeTypes} onSelect={setFilter}/>
        <OPRStatusBar status={status}/>
      </div>

      <div className="leaflet-bar leaflet-control map-sidebar">
        {marker ? <OPRAttributesBar feature={marker} setMarker={setMarker}/> : "Select point to view details"}
      </div>
    </MapSidebar>

    <OPRLayer setStatus={setStatus} filterVal={filterVal} isTileBased={isTileBased} onSelect={setMarker}/>
  </MapContainer>;
}
