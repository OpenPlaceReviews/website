import React, { useEffect, useState, useRef } from 'react';
import { useMap, useMapEvent } from "react-leaflet";
import { OpenLocationCode } from "open-location-code";
import { isEqual, has, get } from "lodash";

import { fetchData } from "../../api/geo";
import MarkerIcon from './MarkerIcon';
import OPRMessageOverlay from "./blocks/OPRMessageOverlay";
import storage from "../../libs/storage";

import L from 'leaflet';
import 'leaflet.markercluster';
import Tasks from './tasks/Tasks';
import Utils from "../util/Utils";

let refreshTimout = null;
let lastRefreshTime = 0;
let currentLayer = null;
const REFRESH_TIMEOUT = 500;
const MIN_MARKERS_ZOOM = 14;
const MIN_MARKERS_TILES_TASK_ZOOM = 10;
var selectedMarkerGroup = [];

export default function OPRLayer({ mapZoom, filterVal, taskSelection, onSelect, setLoading, isPlaceChanged,
                                   setIsPlaceChanged, setMergePlaces}) {
  const [placesCache, setPlacesCache] = useState({});
  const [currentBounds, setCurrentBounds] = useState({});
  const [currentZoom, setCurrentZoom] = useState(mapZoom);
  const map = useMap();
  const openLocationCode = new OpenLocationCode()
  const prevTaskSelection = Utils.usePrevious(taskSelection);

  let task = null;
  let taskStartDate = null;
  let taskEndDate = null;
  let tilesPlacesVisible = false;
  let reviewedPlacesVisible = false;
  let closedPlaces = false;
  let potentiallyClosedPlaces = true;
  if (taskSelection) {
    task = Tasks.getTaskById(taskSelection.taskId);
    taskStartDate = taskSelection.startDate;
    taskEndDate = taskSelection.endDate;
    reviewedPlacesVisible = taskSelection.reviewedPlacesVisible;
    closedPlaces = taskSelection.closedPlaces;
    potentiallyClosedPlaces = taskSelection.potentiallyClosedPlaces;
    tilesPlacesVisible = taskSelection.dateType === 'tiles';
    storage.setItem('taskSelection', JSON.stringify(taskSelection))
  }
  let minMarkersZoom;
  if (task && !tilesPlacesVisible) {
    minMarkersZoom = task.minZoom;
  } else if (task && tilesPlacesVisible) {
    minMarkersZoom = MIN_MARKERS_TILES_TASK_ZOOM;
  } else {
    minMarkersZoom = MIN_MARKERS_ZOOM;
  }

  const onMapChange = async () => {
    const zoom = map.getZoom();
    if (zoom !== currentZoom) {
      setCurrentZoom(zoom);
    }

    if (zoom < minMarkersZoom || (task && !task.tileBasedData && !tilesPlacesVisible)) {
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
            || prevTaskSelection.endDate !== taskSelection.endDate
            || prevTaskSelection.reviewedPlacesVisible !== taskSelection.reviewedPlacesVisible
            || prevTaskSelection.closedPlaces !== taskSelection.closedPlaces
            || prevTaskSelection.potentiallyClosedPlaces !== taskSelection.potentiallyClosedPlaces);
    const forceReload = taskChanged || isPlaceChanged;
    const updateCache = async () => {
      let newCache = {};
      if (task && !tilesPlacesVisible) {
        if (forceReload) {
          setLoading(true);
        } else if (task.tileBasedData) {
          for (let tileId in currentBounds) {
            if (!placesCache[tileId]) {
              setLoading(true);
              break;
            }
          }
        }
        newCache = forceReload ? {} : {...placesCache};
        if (task.tileBasedData) {
          for (let tileId in currentBounds) {
            if (currentZoom === map.getZoom() && currentZoom >= minMarkersZoom) {
              if (forceReload || !placesCache[tileId]) {
                const {geo} = await task.fetchData({tileId, startDate: taskStartDate, endDate: taskEndDate})
                newCache[tileId] = getTileBasedCacheByFilters(geo);
              } else {
                newCache[tileId].access = placesCache[tileId].access + 1;
              }
            }
          }
        } else if (forceReload) {
          const {geo, alreadyReviewedPlaceIds} = await task.fetchData({startDate: taskStartDate, endDate: taskEndDate});
          newCache["all"] = getCacheByFilters({ type: "FeatureCollection", features: geo.features, "alreadyReviewedPlaceIds": alreadyReviewedPlaceIds});
        } else {
          return;
        }
      } else {
        if (forceReload) {
          setLoading(true);
        } else {
          for (let tileId in currentBounds) {
            if (!placesCache[tileId]) {
              setLoading(true);
              break;
            }
          }
        }
        newCache = forceReload ? {} : {...placesCache};
        for (let tileId in currentBounds) {
          if (currentZoom === map.getZoom() && currentZoom >= minMarkersZoom) {
            if (forceReload || !placesCache[tileId]) {
              const {geo} = await fetchData({tileId});
              newCache[tileId] = getTileBasedCacheByFilters(geo);
            } else {
              newCache[tileId].access = placesCache[tileId].access + 1;
            }
          }
        }
      }
      if (currentZoom !== map.getZoom() && (!task || task.tileBasedData || tilesPlacesVisible)) {
        return;
      }
      clearTimeout(loadingTimout);
      loadingTimout = setTimeout(() => {
        setLoading(false);
      }, 1000);
      setPlacesCache(newCache);
      if (forceReload) {
        setIsPlaceChanged(false);
      }
    };

    if (currentZoom >= minMarkersZoom || forceReload) {
      updateCache();
    }
  }, [currentBounds, currentZoom, taskSelection]);

  useEffect(() => {
    if (!task || task.tileBasedData || tilesPlacesVisible) {
      refreshMapDelay();
    }
  }, [placesCache, filterVal, currentZoom]);

  useEffect(() => {
    if (task && !task.tileBasedData && !tilesPlacesVisible) {
      refreshMapDelay();
    }
  }, [placesCache, filterVal]);

  function refreshMapDelay() {
    if (Date.now() - lastRefreshTime < REFRESH_TIMEOUT) {
      clearTimeout(refreshTimout);
    }
    refreshTimout = setTimeout(() => {
      lastRefreshTime = Date.now();
      refreshMap();
    }, REFRESH_TIMEOUT);
  }

  function getTileBasedFilteredFeatures(geo, task) {
    let features = [];
    if (task === 'REVIEW_IMAGES') {
      features = filterReviewImages(geo);
    }
    if (task === 'REVIEW_CLOSED_PLACES') {
      features = filterTileBasedPossibleMerge(geo);
    }
    if (task === 'REVIEW_TRIPADVISOR') {
      features = filterMissingTripAdvisor(geo);
    }
    if (task === 'none') {
      features = filterNone(geo, features);
    }
    return features;
  }

  function getFilteredFeatures(geo, task) {
    let features = [];
    if (task === 'REVIEW_IMAGES') {
      features = filterReviewImages(geo);
    }
    if (task === 'REVIEW_CLOSED_PLACES') {
      features = filterPossibleMerge(geo);
    }
    setMergePlaces(features);
    return features;
  }

  function filterReviewImages(geo) {
    return reviewedPlacesVisible ? geo.features.filter(place => place.properties.images_size > 0)
        : geo.features.filter(place => place.properties.img_review_size > 0);
  }

  function filterPossibleMerge(geo) { 
    let features = [];
    for (let i = 0; i < geo.features.length - 1; ) {
      let group = [];
      let place = geo.features[i];
      if (!geo.alreadyReviewedPlaceIds.includes(place.properties.opr_id)) {
        group.push(place);
      }
      // collect group of deleted objects
      let j = 1;
      for (; j + i < geo.features.length - 1; j++) {
        if (places[i + j].properties.deleted) { // && areSimilar(place, places[i + j], 150)
          if (!geo.alreadyReviewedPlaceIds.includes(place.properties.opr_id)) {
            group.push(places[i + j]);
          }
        }
      }
      // collect group of new objects & add to group
      for (; j + i < geo.features.length - 1; j++) {
        if (!places[i + j].properties.deleted) {
          if (group.length > 0) {
            group.push(places[i + j]);
          }
        }
      }
      i += j;
      features = features.concat(features, group);
    }
    return features;
  }

  function filterTileBasedPossibleMerge(geo) {
    let featuresDeleted = geo.features.filter(place => place.properties.place_deleted_osm !== undefined && place.properties.place_deleted === undefined);
    let featuresCreated = [];
    let sumFeaturesCreated = [];
    for (let i = 0; i < featuresDeleted.length; i++) {
      let featuresCreatedSimilarName = geo.features.filter(place => areSimilarName(featuresDeleted[i], place) && place.properties.place_deleted_osm === undefined)
      if (featuresCreatedSimilarName > 0) {
        sumFeaturesCreated = sumFeaturesCreated.concat(featuresCreatedSimilarName);
      } else {
        featuresCreated = geo.features.filter(place => areSimilar(featuresDeleted[i], place, 50) && place.properties.place_deleted_osm === undefined)
        sumFeaturesCreated = sumFeaturesCreated.concat(featuresCreated);
      }
    }
    if (reviewedPlacesVisible) {
      let alreadyMergedFeatures = geo.features.filter(place => place.properties.sources[0].deleted)
      let mergedFeatures = featuresDeleted.concat(sumFeaturesCreated);
      return mergedFeatures.concat(alreadyMergedFeatures);
    } else {
      return featuresDeleted.concat(sumFeaturesCreated);
    }
  }

  function filterMissingTripAdvisor(geo) {
    return reviewedPlacesVisible ? geo.features.filter(place => place.properties.has_tripadvisor !== undefined)
        : geo.features.filter(place => place.properties.has_tripadvisor === undefined);
  }

  function filterNone(geo, features) {
    if (!potentiallyClosedPlaces) {
      features = geo.features.filter(place => place.properties.place_deleted_osm === undefined);
      if (closedPlaces) {
        let closedFeatures = geo.features.filter(place => place.properties.place_deleted !== undefined);
        return features.concat(closedFeatures);
      } else {
        return features.filter(place => place.properties.place_deleted === undefined);
      }
    }
    if (!closedPlaces) {
      features = geo.features.filter(place => place.properties.place_deleted === undefined);
    }
    return features;
  }

  function areSimilarName(place1, place2) {
    if (place2 && place2.properties.place_deleted === undefined && place1.properties.title === place2.properties.title) {
      const [lat, lon] = place1.geometry.coordinates;
      let similarPlaceDistance = 100;
      const [gLat, gLon] = place2.geometry.coordinates;
      const distance = Utils.getDistance(lat, lon, gLat, gLon);
      if (distance < similarPlaceDistance) {
        return true;
      }
    }
    return false;
  }

  function areSimilar(place1, place2, similarPlaceDistance) {
    if (place2 && place2.properties.place_deleted === undefined) {
      const [lat, lon] = place1.geometry.coordinates;
      const [gLat, gLon] = place2.geometry.coordinates;
      const distance = Utils.getDistance(lat, lon, gLat, gLon);
      if (distance < similarPlaceDistance) {
        return true;
      }
    }
    return false;
  }

  function getTileBasedCacheByFilters(geo) {
    if (!potentiallyClosedPlaces || !closedPlaces) {
      let features = getTileBasedFilteredFeatures(geo, taskSelection.taskId);
      return {"access": 1, data: {type: "FeatureCollection", features}};
    } else {
      return {"access": 1, data: geo};
    }
  }

  function getCacheByFilters(geo) {
    if (!reviewedPlacesVisible && taskSelection.taskId !== "none") {
      let features = getFilteredFeatures(geo, taskSelection.taskId);
      return {data: {type: "FeatureCollection", features}};
    } else {
      return {data: geo};
    }
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
    if (task && !task.tileBasedData && !tilesPlacesVisible) {
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
        const icon = MarkerIcon(feature.properties.place_type, feature.properties.place_deleted, feature.properties.place_deleted_osm, feature.properties.deleted);
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
