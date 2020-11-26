import React from "react";
import {Marker, Popup} from "react-leaflet";
import MarkerIcon from './MrkerIcon';

export default function ({feature}) {
  const {title, opr_id, tags, osm_id, osm_type, place_type} = feature.properties;
  const popupTags = [];
  for (let t in tags) {
    popupTags.push({
      name: t,
      value: tags[t].value,
    });
  }

  const lngLat = feature.geometry.coordinates;
  const latLng = [lngLat[1], lngLat[0]];

  const icon = MarkerIcon(place_type);

  return <Marker
    icon={icon}
    position={latLng}
  >
    <Popup autoPan={false}>
      <p><strong>{title}</strong></p>
      {!!opr_id && <p>
        <strong>ID: </strong>
        <a href={`/api/admin?view=objects&browse=type&type=opr.place&subtype=id&key=${opr_id}`}>{opr_id}</a>
      </p>}
      <p>
        <strong>Location: </strong>
        {latLng[0]}, {latLng[1]}
      </p>
      <dl className="tags-grid">
        {popupTags.map((tag, i) => {
          return <React.Fragment key={i}>
            <dt className="tags-item">{tag.name}</dt>
            <dd className="tags-item">{tag.value}</dd>
          </React.Fragment>;
        })}
      </dl>
      {!!osm_id && <p><a href={`https://www.openstreetmap.org/${osm_type}/${osm_id}`}>OpenStreetMap</a></p>}
    </Popup>
  </Marker>
};
