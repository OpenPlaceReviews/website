import React from 'react';

export default ({status}) => {
  console.log('STATUS BAR IS RENDER');
  return <p className="map-status">{status}</p>;
};
