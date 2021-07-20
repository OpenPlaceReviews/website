import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import qs from "qs";

import { fetchData } from "../../api/geo";
import storage from "../../libs/storage";

import { usePromiseTracker } from "react-promise-tracker";

import OPRLayer from "./OPRLayer";
import MapSidebar from "./blocks/sidebar/MapSidebar";
import ViewTracker from "./ViewTracker";
import OPRMessageOverlay from "./blocks/OPRMessageOverlay";
import MarkerBlock from "./blocks/MarkerBlock";
import Filter from "./blocks/Filter";
import MapSidebarBlock from "./blocks/sidebar/MapSidebarBlock";
import Loader from "../main/blocks/Loader";
import AuthContext from "../main/auth/providers/AuthContext";
import Utils from "../util/Utils";
import useTaskSelectionState from "./hooks/useTaskSelectionState";
import MergeList from "./MergeList";

const OPR_PLACE_URL_PREFIX = '/map/opr.place/';
const INIT_LAT = 40.0;
const INIT_LON = -35.0;
const INIT_ZOOM = 4;
const PLACE_MENU_ZOOM = 17;

export default function Map() {

  const { authData } = useContext(AuthContext);
  const isLoggedIn = authData.name && authData.name.length;

  let mapLatLon = [INIT_LAT, INIT_LON];
  let mapZoom = INIT_ZOOM;

  let hasParams = false;
  const reqParams = qs.parse(location.search.substring(1));
  const { q } = reqParams;
  if (q) {
    const mapParams = q.split("/");
    if (mapParams.length === 3) {
      let pZoom = mapParams[0];
      let pLat = mapParams[1];
      let pLon = mapParams[2];
      try {
        if (pZoom > 0 && pZoom < 32 && pLat >= -90 && pLat <= 90 && pLon >= -180 && pLon <= 180) {
          mapZoom = parseInt(pZoom, 10);
          mapLatLon = [parseFloat(pLat), parseFloat(pLon)];
          hasParams = true;
        }
      } catch (e) {
        console.warn('Error while decoding map parameters');
      }
    }
  }

  if (!hasParams) {
    try {
      const view = JSON.parse(storage.mapView || '');
      if (!!view) {
        mapZoom = view.zoom;
        mapLatLon = [view.lat, view.lng];
      }
    } catch (e) {
      console.warn('Error while decoding saved view');
    }
  }

  const reqPath = location.pathname;
  let initialMarker = null;
  if (reqPath.startsWith(OPR_PLACE_URL_PREFIX)) {
    let oprPlaceId = reqPath.substring(OPR_PLACE_URL_PREFIX.length)
    initialMarker = {
      initial: true,
      properties: { opr_id: `${oprPlaceId}` },
    };
  }
  const date = new Date();
  const [taskSelection, setTaskSelection] = useTaskSelectionState({
    taskId: 'none',
    reviewedPlacesVisible: false,
    closedPlaces: false,
    potentiallyClosedPlaces: true,
    dateType: 'tiles',
    startDate: new Date(date.getFullYear(), date.getMonth(), 1),
    endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0)
  });
  const [map, setMap] = useState(null);
  const [placeTypes, setPlaceTypes] = useState({});
  const [filterVal, setFilter] = useState('all');
  const [marker, setMarker] = useState(initialMarker);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const { promiseInProgress } = usePromiseTracker();
  const [isPlaceChanged, setIsPlaceChanged] = useState(false);
  const [mergePlaces, setMergePlaces] = useState(null);
  const [mergeListDialogOpen, setMergeListDialogOpen] = useState(false);

  useEffect(() => {
    const request = async () => {
      const { parameters } = await fetchData();
      setPlaceTypes(parameters.placeTypes);
    };

    request();
  }, []);

  useEffect(() => {
    if (!marker || !marker.initial) {
      onMapStateChanged(mapZoom, mapLatLon[0], mapLatLon[1]);
    }
  }, [marker]);

  useEffect(() => {
    if (!marker && map) {
      map._handlers.forEach(handler => handler.enable());
    }
  }, [marker, map]);

  const onMapStateChanged = (zoom, lat, lng) => {
    mapLatLon = [lat, lng];
    mapZoom = zoom;
    let coords = `q=${zoom}/${lat.toFixed(5)}/${lng.toFixed(5)}`;
    if (marker) {
      const { opr_id } = marker.properties;
      history.replaceState(null, null, `/map/opr.place/${opr_id}?${coords}`);
    } else {
      history.replaceState(null, null, `/map?${coords}`);
    }
  }

  function setMarkerWithGroup(marker, markerGroup) {
    if (isLoggedIn && markerGroup.length > 0) {
      const {coordinates} = marker.geometry;
      const [lat, lon] = coordinates;

      let similarMarkerDistance = 150;
      let similarMarker = null;
      for (const i in markerGroup) {
        const groupMarker = markerGroup[i];
        if (marker === groupMarker.feature) {
          continue;
        }
        const {coordinates} = groupMarker.feature.geometry;
        const [gLat, gLon] = coordinates;
        const distance = Utils.getDistance(lat, lon, gLat, gLon);
        if (distance < similarMarkerDistance) {
          similarMarkerDistance = distance;
          similarMarker = groupMarker;
        }
      }
      if (similarMarker) {
        marker.properties.similar_opr_id = similarMarker.feature.properties.opr_id;
      }
    }
    setMarker(marker);
  }

  return <MapContainer center={mapLatLon} zoom={mapZoom} zoomControl={false} whenCreated={setMap} whenReady={() => setLoading(false)}>
    <TileLayer
      attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
      url="https://tile.osmand.net/{z}/{x}/{y}.png"
      id="tiles"
    />
    <ViewTracker whenMoved={() => {
      onMapStateChanged(map.getZoom(), map.getCenter().lat, map.getCenter().lng);
    }} />

    {marker && <MarkerBlock marker={marker} setMarker={setMarker} placeTypes={placeTypes} setIsPlaceChanged={setIsPlaceChanged} whenReady={(markerPlace) => {
      if (!hasParams) {
        map.setView(markerPlace.latLon, PLACE_MENU_ZOOM);
      }
    }} />}

    <MapSidebar position="topright">
      <MapSidebarBlock>
        <Filter isLoggedIn={isLoggedIn} taskSelection={taskSelection} onTaskSelect={setTaskSelection} placeTypes={placeTypes}
                onCategorySelect={setFilter} mergePlaces={mergePlaces} setMergePlaces={setMergePlaces} setMergeListDialogOpen={setMergeListDialogOpen}/>
      </MapSidebarBlock>
    </MapSidebar>

    {(loading || reload || promiseInProgress) && <OPRMessageOverlay><Loader position="relative" /></OPRMessageOverlay>}
    {!loading && <OPRLayer mapZoom={mapZoom} filterVal={filterVal} taskSelection={taskSelection} onSelect={setMarkerWithGroup}
                           setLoading={setReload} isPlaceChanged={isPlaceChanged} setIsPlaceChanged={setIsPlaceChanged}
                           setMergePlaces={setMergePlaces}/>}
    <MergeList mergeListDialogOpen={mergeListDialogOpen} mergePlaces={mergePlaces} placeTypes={placeTypes} setMergeListDialogOpen={setMergeListDialogOpen}/>
  </MapContainer>;
}
