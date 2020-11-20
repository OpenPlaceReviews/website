import React from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import ServiceLayer from "./map/ServiceLayer";

export default () => {
  return <MapContainer center={[40, -35]} zoom={4}>
    <TileLayer
      attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
      url="https://tile.osmand.net/{z}/{x}/{y}.png"
      id="tiles"
    />

    <ServiceLayer/>
  </MapContainer>;
}
