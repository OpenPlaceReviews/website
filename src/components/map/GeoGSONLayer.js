import React from 'react';
import {isEmpty} from "lodash";
import MarkerEntity from "./MarkerEntity";
import MarkerClusterGroup from "./MarkerClusterGroup";

import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default ({data}) => {
  return <MarkerClusterGroup>
    {!isEmpty(data) && data.features.map((feature,i) => <MarkerEntity feature={feature} key={i}/>)}
  </MarkerClusterGroup>;
};
