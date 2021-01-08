import React from 'react';

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

export default ({ position, children }) => {
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topleft
  return <div className={`${positionClass} `}>
    <div className="leaflet-bar leaflet-control map-sidebar">
      {children}
    </div>
  </div>;
}
