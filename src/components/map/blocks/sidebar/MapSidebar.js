import React, {useEffect, useRef} from 'react';
import {makeStyles} from "@material-ui/styles";
import L from "leaflet";

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
  left: 'leaflet-top leaflet-bottom leaflet-left',
  right: 'leaflet-top leaflet-bottom leaflet-right',
}

const useStyles = makeStyles({
  sidebar: {
    border: "none !important",
    display: "flex",
    flexDirection: "column",
    alignItems: (props) => {props.alignItems},
  }
});

export default ({ position, className, children }) => {
  const sidebarRef = useRef();
  useEffect(() => {
    L.DomEvent.disableScrollPropagation(sidebarRef.current);
    L.DomEvent.addListener(sidebarRef.current, 'mousedown touchstart dblclick', (e) => {
      let className = '';
      if (_.isString(e.target.className)) {
        className = e.target.className;
      } else if (_.isString(e.target.class)) {
        className = e.target.class;
      }

      if(!className.includes('MuiSelect-root')) {
        L.DomEvent.stopPropagation(e);
      }
    });
  }, []);

  let alignItems;
  if (position === 'topright' || position === 'bottomright' || position ==='right') {
    alignItems = 'flex-end';
  } else {
    alignItems = 'flex-start';
  }

  const classes = useStyles({alignItems});
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topleft

  return <div className={`${positionClass}`} ref={sidebarRef}>
    <div className={`leaflet-bar leaflet-control ${classes.sidebar} ${className ? className : ''}`}>
      {children}
    </div>
  </div>;
}
