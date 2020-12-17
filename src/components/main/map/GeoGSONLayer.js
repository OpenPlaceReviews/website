import React from 'react';
import MarkerEntity from "./MarkerEntity";
import MarkerClusterGroup from "./MarkerClusterGroup";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default ({features}) => {
  return <MarkerClusterGroup>
    {features.length && features.map((feature) => <MarkerEntity feature={feature} key={feature.properties.opr_id}/>)}
  </MarkerClusterGroup>;
};
