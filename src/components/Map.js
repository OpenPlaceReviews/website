import React, {useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default () => {
  const [center, setCenter] = useState([40, -35]);
  const [zoom, setZoom] = useState(4);

  return <>
    <MapContainer center={center} zoom={zoom}>
      <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
        url="https://tile.osmand.net/{z}/{x}/{y}.png"
        id="tiles"
      />
    </MapContainer>
  </>;
}
