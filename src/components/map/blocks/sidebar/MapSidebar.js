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
    padding: "15px",
    background: "#FFFFFF",
    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "384px",
    "& p": {
      margin: 0,
    },
  }
});

export default ({ position, children }) => {
  const classes = useStyles();
  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topleft
  return <div className={`${positionClass} `}>
    <div className={`leaflet-bar leaflet-control ${classes.sidebar}`}>
      {children}
    </div>
  </div>;
}
