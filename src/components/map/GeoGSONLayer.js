import React from 'react';
import {isEmpty} from "lodash";
import MarkerEntity from "./MarkerEntity";

export default ({data}) => {
  return <>
    {!isEmpty(data) && data.features.map((feature,i) => <MarkerEntity feature={feature} key={i}/>)}
  </>;
};
