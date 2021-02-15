import React, { useEffect, useState } from 'react';
import { useMap, useMapEvent } from "react-leaflet";
import { OpenLocationCode } from "open-location-code";
import { isEqual, has, get } from "lodash";

import { fetchData } from "../../api/geo";
import MarkerIcon from './MrkerIcon';
import OPRMessageOverlay from "./blocks/OPRMessageOverlay";

import L from 'leaflet';
import 'leaflet.markercluster';

let refreshTimout = null;
let lastRefreshTime = 0;
let currentLayer = null;
const REFRESH_TIMEOUT = 500;
const MIN_MARKERS_ZOOM = 14;

export default function OPRLayer({ mapZoom, filterVal, onSelect, setLoading }) {
  const [placesCache, setPlacesCache] = useState({});
  const [currentBounds, setCurrentBounds] = useState({});
  const [currentZoom, setCurrentZoom] = useState(mapZoom);

  const map = useMap();
  const openLocationCode = new OpenLocationCode()

  const onMapChange = async () => {
    const zoom = map.getZoom();
    if (zoom !== currentZoom) {
      setCurrentZoom(zoom);
    }

    if (zoom < MIN_MARKERS_ZOOM) {
      refreshMapDelay();
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
        const clat = (lat - 0.5) / INT_PR;
        const clon = (lon + 0.5) / INT_PR;
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
        if (!placesCache[tileId]) {
          const { geo } = await fetchData({ tileId });
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
      }, 1000);
      setPlacesCache(newCache);
    };

    if (currentZoom >= MIN_MARKERS_ZOOM) {
      updateCache();
    }
  }, [currentBounds, currentZoom]);

  useEffect(() => {
    refreshMapDelay();
  }, [placesCache, filterVal, currentZoom]);

  function refreshMapDelay() {
    if (Date.now() - lastRefreshTime < REFRESH_TIMEOUT) {
      clearTimeout(refreshTimout);
    }
    refreshTimout = setTimeout(() => {
      lastRefreshTime = Date.now();
      refreshMap();
    }, REFRESH_TIMEOUT);
  }

  useEffect(() => {
    if (Object.keys(placesCache).length >= 150) {
      const newCache = { ...placesCache };
      const toDel = {};

      for (let tileId in placesCache) {
        if (!(tileId in currentBounds)) {
          toDel[tileId] = placesCache[tileId].access;
        }
      }
      for (let tileId in toDel) {
        delete newCache[tileId];
      }

      setPlacesCache(newCache);
    }
  }, [placesCache]);

  useMapEvent('moveend', () => {
    onMapChange();
  });

  function refreshMap() {
    if (currentLayer) {
      map.removeLayer(currentLayer);
    }
    if (currentZoom < MIN_MARKERS_ZOOM) {
      return;
    }
    let newFeatures = [];
    for (let tileId in currentBounds) {
      if (has(placesCache, `${tileId}.data.features`)) {
        const features = get(placesCache, `${tileId}.data.features`);
        if (filterVal === "all") {
          newFeatures = newFeatures.concat(features);
        } else {
          newFeatures = newFeatures.concat(features.filter((f) => f.properties.place_type === filterVal));
        }
      }
    }
    var geoJson = {
      "type": "FeatureCollection",
      "features": newFeatures
    };

    currentLayer = L.markerClusterGroup({ chunkedLoading: true });

    let currentLayerPoints = L.geoJSON(geoJson, {
      style: (feature) => {
        feature.properties && feature.properties.style;
      },

      pointToLayer: (feature, latlng) => {
        const icon = MarkerIcon(feature.properties.place_type);
        const marker = L.marker(latlng, { icon: icon });
        return marker.on('click', () => onSelect(feature));
      }
    });
    currentLayer.addLayer(currentLayerPoints);
    map.addLayer(currentLayer);
  }

  return <div className="opr-layer">
    {(map.getZoom() < MIN_MARKERS_ZOOM) && <OPRMessageOverlay>Zoom in to view details</OPRMessageOverlay>}
  </div>;
};
