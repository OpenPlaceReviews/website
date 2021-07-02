import React from "react";
import {Marker} from "react-leaflet";
import MarkerIcon from './MarkerIcon';

export default function ({feature, onSelect}) {
  const {place_type} = feature.properties;
  const {place_deleted} = feature.properties.place_deleted;
  const {place_deleted_osm} = feature.properties.place_deleted_osm;
  const lngLat = feature.geometry.coordinates;
  const latLng = [lngLat[1], lngLat[0]];

  const icon = MarkerIcon(place_type, place_deleted, place_deleted_osm);

  const onClickHandler = () => {
    onSelect(feature);
  };

  return <Marker icon={icon} position={latLng} eventHandlers={{ click: onClickHandler}} properties={feature.properties} />
};
