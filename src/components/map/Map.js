import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { fetchData } from "../../api/geo";
import storage from "../../libs/storage";

import {usePromiseTracker} from "react-promise-tracker";

import OPRLayer from "./OPRLayer";
import MapSidebar from "./blocks/sidebar/MapSidebar";
import ViewTracker from "./ViewTracker";
import OPRMessageOverlay from "./blocks/OPRMessageOverlay";
import MarkerBlock from "./blocks/sidebar/MarkerBlock";
import Filter from "./blocks/Filter";
import MapSidebarBlock from "./blocks/sidebar/MapSidebarBlock";
import ReviewPlaces from "./blocks/ReviewPlaces";
import Loader from "../main/blocks/Loader";

export default function Map() {
  let initialLatLng = [40, -35];
  let initialZoom = 4;

  try {
    const view = JSON.parse(storage.mapView || '');
    if (!!view) {
      initialZoom = view.zoom;
      initialLatLng = [view.lat, view.lng];
    }
  } catch (e) {
    console.warn('Error while decoding saved view');
  }

  const [placeTypes, setPlaceTypes] = useState({});
  const [filterVal, setFilter] = useState('all');
  const [isTileBased, setTileBased] = useState(false);
  const [marker, setMarker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const {promiseInProgress} = usePromiseTracker();

  useEffect(() => {
    const request = async () => {
      const {tileBased, placeTypes} = await fetchData();
      setTileBased(tileBased);
      setPlaceTypes(placeTypes);
    };

    request();
  }, []);

  return <MapContainer center={initialLatLng} zoom={initialZoom} zoomControl={false} whenReady={() => setLoading(false)}>
    <TileLayer
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
        url="https://tile.osmand.net/{z}/{x}/{y}.png"
        id="tiles"
    />
    <ViewTracker/>
    {marker && <MarkerBlock marker={marker} setMarker={setMarker}/>}

    <MapSidebar position="topright">
      <MapSidebarBlock>
        <Filter placeTypes={placeTypes} onSelect={setFilter}/>
      </MapSidebarBlock>
      <ReviewPlaces setMarker={setMarker} reload={reload}/>
    </MapSidebar>

    {(loading || reload || promiseInProgress) && <OPRMessageOverlay><Loader position="relative"/></OPRMessageOverlay>}
    {!loading && <OPRLayer initialZoom={initialZoom} filterVal={filterVal} isTileBased={isTileBased} onSelect={setMarker} setLoading={setReload}/>}
  </MapContainer>;
}
