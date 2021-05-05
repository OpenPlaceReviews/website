import React, { useEffect, useState, useRef } from 'react';
import { useMap, useMapEvent } from "react-leaflet";
import { OpenLocationCode } from "open-location-code";
import { isEqual, has, get } from "lodash";

import { fetchData } from "../../api/geo";
import MarkerIcon from './MrkerIcon';
import OPRMessageOverlay from "./blocks/OPRMessageOverlay";

import L from 'leaflet';
import 'leaflet.markercluster';
import Tasks from './tasks/Tasks';
import {bool} from "prop-types";

let refreshTimout = null;
let lastRefreshTime = 0;
let currentLayer = null;
const REFRESH_TIMEOUT = 500;
const MIN_MARKERS_ZOOM = 14;
var selectedMarkerGroup = [];

export default function OPRLayer({ mapZoom, filterVal, taskSelection, onSelect, setLoading, isPlaceChanged }) {
  const [placesCache, setPlacesCache] = useState({});
  const [currentBounds, setCurrentBounds] = useState({});
  const [currentZoom, setCurrentZoom] = useState(mapZoom);
  //const [selectedMarkerGroup, setSelectedMarkerGroup] = useState([]);
  const map = useMap();
  const openLocationCode = new OpenLocationCode()
  const prevTaskSelection = usePrevious(taskSelection);

  let task = null;
  let taskStartDate = null;
  let taskEndDate = null;
  if (taskSelection) {
    task = Tasks.getTaskById(taskSelection.taskId);
    taskStartDate = taskSelection.startDate;
    taskEndDate = taskSelection.endDate;
  }
  let minMarkersZoom = task ? task.minZoom : MIN_MARKERS_ZOOM;

  const onMapChange = async () => {
    const zoom = map.getZoom();
    if (zoom !== currentZoom) {
      setCurrentZoom(zoom);
    }

    if (zoom < minMarkersZoom || (task && !task.tileBasedData)) {
      setCurrentBounds({});
      return;
    }

    const updateBounds = async () => {
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

    updateBounds();
  };

  useEffect(() => {
    onMapChange();
  }, []);

  useEffect(() => {
    let loadingTimout = null;
    const taskChanged = prevTaskSelection &&
      (prevTaskSelection.taskId !== taskSelection.taskId
        || prevTaskSelection.startDate !== taskSelection.startDate
        || prevTaskSelection.endDate !== taskSelection.endDate);
    const updateCache = async () => {
      let newCache = {};
      if (task) {
        if (taskChanged || isPlaceChanged) {
          setLoading(true);
        } else if (task.tileBasedData) {
          for (let tileId in currentBounds) {
            if (!placesCache[tileId]) {
              setLoading(true);
              break;
            }
          }
        }
        newCache = taskChanged ? {} : { ...placesCache };
        if (task.tileBasedData) {
          for (let tileId in currentBounds) {
            if (currentZoom === map.getZoom() && currentZoom >= minMarkersZoom) {
              if (taskChanged || !placesCache[tileId]) {
                const { geo } = await task.fetchData({ tileId, startDate: taskStartDate, endDate: taskEndDate })
                newCache[tileId] = { "access": 1, data: geo, };
              } else {
                newCache[tileId].access = placesCache[tileId].access + 1;
              }
            }
          }
        } else if (taskChanged || isPlaceChanged) {
          //console.log('get all data');
          const { geo } = await task.fetchData({ startDate: taskStartDate, endDate: taskEndDate });
          //console.log('data=' + geo);
          newCache["all"] = { data: geo, };
        } else {
          return;
        }
      } else {
        if (taskChanged || isPlaceChanged) {
          setLoading(true);
        } else {
          for (let tileId in currentBounds) {
            if (!placesCache[tileId]) {
              setLoading(true);
              break;
            }
          }
        }
        newCache = taskChanged ? {} : { ...placesCache };
        for (let tileId in currentBounds) {
          if (currentZoom === map.getZoom() && currentZoom >= minMarkersZoom) {
            if (taskChanged || !placesCache[tileId]) {
              const { geo } = await fetchData({ tileId });
              newCache[tileId] = { "access": 1, data: geo, };
            } else {
              newCache[tileId].access = placesCache[tileId].access + 1;
            }
          }
        }
      }
      if (currentZoom !== map.getZoom() && (!task || task.tileBasedData)) {
        return;
      }
      clearTimeout(loadingTimout);
      loadingTimout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      setPlacesCache(newCache);
    };

    if (currentZoom >= minMarkersZoom || taskChanged) {
      updateCache();
    }
  }, [currentBounds, currentZoom, taskSelection]);

  useEffect(() => {
    if (!task || task.tileBasedData) {
      refreshMapDelay();
    }
  }, [placesCache, filterVal, currentZoom]);

  useEffect(() => {
    if (task && !task.tileBasedData) {
      refreshMapDelay();
    }
  }, [placesCache, filterVal]);

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

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

  const refreshMap = async () => {
    if (currentLayer) {
      map.removeLayer(currentLayer);
    }
    if (currentZoom < minMarkersZoom) {
      return;
    }
    let newFeatures = [];
    if (task && !task.tileBasedData) {
      if (has(placesCache, 'all.data.features')) {
        const features = get(placesCache, 'all.data.features');
        if (filterVal === "all") {
          newFeatures = newFeatures.concat(features);
        } else {
          newFeatures = newFeatures.concat(features.filter((f) => f.properties.place_type === filterVal));
        }
      }
    } else {
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
    }
    var geoJson = {
      "type": "FeatureCollection",
      "features": newFeatures
    };

    //console.log('newFeatures=' + newFeatures.length);

    currentLayer = L.markerClusterGroup({ chunkedLoading: true });

    let currentLayerPoints = L.geoJSON(geoJson, {
      style: (feature) => {
        feature.properties && feature.properties.style;
      },

      pointToLayer: (feature, latlng) => {
        const icon = MarkerIcon(feature.properties.place_type);
        const marker = L.marker(latlng, { icon: icon });
        return marker.on('click', () => onMarkerClick(feature));
      }
    });

    currentLayer.on('clusterclick', function (a) {
      selectedMarkerGroup = a.layer.getAllChildMarkers();
    });
    currentLayer.addLayer(currentLayerPoints);
    map.addLayer(currentLayer);
  }

  const onMarkerClick = (feature) => {
    onSelect(feature, selectedMarkerGroup);
  };

  return <div className="opr-layer">
    {(map.getZoom() < minMarkersZoom) && <OPRMessageOverlay>Zoom in to view details</OPRMessageOverlay>}
  </div>;
};
