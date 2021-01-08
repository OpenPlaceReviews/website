import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { fetchData } from "../../api/geo";

import OPRLayer from "./OPRLayer";
import MapSidebar from "./blocks/sidebar/MapSidebar";

import StatusBar from "./blocks/StatusBar";
import Filter from "./blocks/Filter";
import ViewTracker from "./ViewTracker";
import OPRAttributesBar from "./blocks/OPRAttributesBar";
import MapSidebarBlock from "./blocks/sidebar/MapSidebarBlock";
import useExtractImages from "./hooks/useExtractImages";
import ImagesCarousel from "./blocks/ImagesCarousel";

const OPRStatusBar = React.memo(StatusBar);
const OPRMarkersFilter = React.memo(Filter);

export default function Map() {
  const [placeTypes, setPlaceTypes] = useState({});
  const [status, setStatus] = useState('Loading data...');
  const [filterVal, setFilter] = useState('all');
  const [isTileBased, setTileBased] = useState(false);
  const [marker, setMarker] = useState(null);

  const [expanded, setExpanded] = useState('filter');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleSelect = (marker) => {
    setMarker(marker);

    if (marker) {
      setExpanded('attributes');
    } else {
      setExpanded('filter');
    }
  };

  const images = useExtractImages(marker);

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
      <MapSidebarBlock header="Filter places" expanded={expanded} onChange={handleChange} name="filter">
        <OPRMarkersFilter placeTypes={placeTypes} onSelect={setFilter}/>
        <OPRStatusBar status={status}/>
      </MapSidebarBlock>

      <MapSidebarBlock header="Attributes" expanded={expanded} onChange={handleChange} name="attributes">
        {marker ? <OPRAttributesBar feature={marker} setMarker={handleSelect} setExpanded={handleChange} expanded={expanded}/> : "Select point to view details"}
      </MapSidebarBlock>

      {images.outdoor && <MapSidebarBlock header="Outdoor" expanded={expanded} onChange={handleChange} name="outdoor">
        <ImagesCarousel items={images.outdoor}/>
      </MapSidebarBlock>}

      {images.indoor && <MapSidebarBlock header="Indoor" expanded={expanded} onChange={handleChange} name="indoor">
        <ImagesCarousel items={images.indoor}/>
      </MapSidebarBlock>}
    </MapSidebar>
    
    <OPRLayer setStatus={setStatus} filterVal={filterVal} isTileBased={isTileBased} onSelect={handleSelect}/>
  </MapContainer>;
}
