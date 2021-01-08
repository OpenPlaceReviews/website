import React from "react";
import {Marker} from "react-leaflet";
import MarkerIcon from './MrkerIcon';

export default function ({feature, onSelect}) {
  const {place_type} = feature.properties;
  const lngLat = feature.geometry.coordinates;
  const latLng = [lngLat[1], lngLat[0]];

  const icon = MarkerIcon(place_type);

  const onClickHandler = () => {
    onSelect(feature);
  };

  return <Marker icon={icon} position={latLng} eventHandlers={{ click: onClickHandler}} />
};
