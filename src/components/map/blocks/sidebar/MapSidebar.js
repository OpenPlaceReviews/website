import React from 'react';
import {makeStyles} from "@material-ui/styles";

const POSITION_CLASSES = {
  bottomleft: 'leaflet-bottom leaflet-left',
  bottomright: 'leaflet-bottom leaflet-right',
  topleft: 'leaflet-top leaflet-left',
  topright: 'leaflet-top leaflet-right',
}

const useStyles = makeStyles({
  sidebar: {
    border: "none !important",
    display: "flex",
    flexDirection: "column",
    alignItems: (props) => {props.alignItems},
  }
});

export default ({ position, children }) => {
  let alignItems;
  if (position === 'topright' || position === 'bottomright') {
    alignItems = 'flex-end';
  } else {
    alignItems = 'flex-start';
  }

  const classes = useStyles({alignItems});
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topleft
  return <div className={`${positionClass} `}>
    <div className={`leaflet-bar leaflet-control ${classes.sidebar}`}>
      {children}
    </div>
  </div>;
}
