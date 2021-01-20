import React, {useEffect, useState} from 'react';
import {useMap, useMapEvent} from "react-leaflet";
import {OpenLocationCode} from "open-location-code";
import {isEqual, has, get} from "lodash";

import {fetchData} from "../../api/geo";
import MarkerEntity from "./MarkerEntity";
import OPRMessageOverlay from "./blocks/OPRMessageOverlay";
import MarkerClusterGroup from "./MarkerClusterGroup";
import Loader from "../main/blocks/Loader";

let isMapMoving = false;
let refreshTimeout = null;
const REFRESH_TIMEOUT = 300;
const MIN_MARKERS_ZOOM = 16;

export default function OPRLayer({initialZoom, filterVal, isTileBased, onSelect}) {
  const [placesCache, setPlacesCache] = useState({});

  const [currentLayer, setCurrentLayer] = useState([]);
  const [currentBounds, setCurrentBounds] = useState({});
  const [currentZoom, setCurrentZoom] = useState(initialZoom);
  const [loading, setLoading] = useState(false);

  const map = useMap();
  const openLocationCode = new OpenLocationCode()

  const onMapChange = async () => {
    const zoom = map.getZoom();
    if (zoom !== currentZoom) {
      setCurrentZoom(zoom);
    }

    if (zoom < MIN_MARKERS_ZOOM) {
      setCurrentLayer({});
      return;
    }

    const bounds = map.getBounds();

    const lcodes = {};
    const INT_PR = 20;
    const tllat = Math.ceil(bounds.getNorth() * INT_PR);
    const tllon = Math.floor(bounds.getWest() * INT_PR);
    const brlat = Math.floor(bounds.getSouth() * INT_PR);
    const brlon = Math.ceil(bounds.getEast() * INT_PR);
    for (let lat = tllat; lat > brlat; lat--) {
      for (let lon = tllon; lon < brlon; lon++) {
        const clat = (lat - 0.5) / INT_PR ;
        const clon = (lon + 0.5) / INT_PR ;
        const tileId = openLocationCode.encode(clat, clon, 6).substring(0, 6);
        lcodes[tileId] = {};
      }
    }

    if (!isEqual(lcodes, currentBounds)) {
      setCurrentBounds(lcodes);
    }
  };

  useEffect(() => {
    onMapChange();
  }, []);

  useEffect(() => {
    let loadingTimout = null;

    const updateCache = async () => {
      let missing = 0;
      for (let tileId in currentBounds) {
        if (!placesCache[tileId]) {
          missing++;
        }
      }

      setLoading(missing > 0);

      const newCache = { ...placesCache };

      for (let tileId in currentBounds) {
        if(!placesCache[tileId]) {
          const {geo} = await fetchData({tileId});
          newCache[tileId] = {
            "access": 1,
            data: geo,
          };
        } else {
          newCache[tileId].access = placesCache[tileId].access + 1;
        }
      }

      clearTimeout(loadingTimout);
      loadingTimout = setTimeout(() => {
        setLoading(false);
      }, 500);
      setPlacesCache(newCache);
    };

    if (isTileBased && currentZoom >= MIN_MARKERS_ZOOM) {
      updateCache();
    }
  },[currentBounds, currentZoom, isTileBased]);

  useEffect(() => {
    const updateLayer = () => {
      let newLayer = [];

      for (let tileId in currentBounds) {
        if (has(placesCache, `${tileId}.data.features`)) {
          const features = get(placesCache, `${tileId}.data.features`);
          if (filterVal === "all") {
            newLayer = newLayer.concat(features);
          } else {
            newLayer = newLayer.concat(features.filter((f) => f.properties.place_type === filterVal));
          }
        }
      }

      if (!isMapMoving) {
        setCurrentLayer(newLayer);
      }
    };

    if (isTileBased && currentZoom >= MIN_MARKERS_ZOOM) {
      updateLayer();
    }
  }, [placesCache, filterVal, currentZoom, isTileBased]);

  useEffect(() => {
    if(Object.keys(placesCache).length >= 150) {
      const newCache = { ...placesCache };
      const toDel = {};

      for(let tileId in placesCache) {
        if(!(tileId in currentBounds)) {
          toDel[tileId] = placesCache[tileId].access;
        }
      }
      for(let tileId in toDel) {
        delete newCache[tileId];
      }

      setPlacesCache(newCache);
    }
  }, [placesCache]);

  useMapEvent('moveend', () => {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(() => {
      isMapMoving = false;
      onMapChange();
    }, REFRESH_TIMEOUT);
  });

  useMapEvent('movestart', () => {
    isMapMoving = true;
  });

  return <div className="opr-layer">
    {(loading) && <OPRMessageOverlay><Loader position="relative"/></OPRMessageOverlay>}
    {(map.getZoom() < MIN_MARKERS_ZOOM) && <OPRMessageOverlay>Zoom in to view details</OPRMessageOverlay>}
    <MarkerClusterGroup>
      {currentLayer.length && currentLayer.map((feature) => <MarkerEntity feature={feature} key={feature.properties.opr_id} onSelect={onSelect}/>)}
    </MarkerClusterGroup>
  </div>;
};
