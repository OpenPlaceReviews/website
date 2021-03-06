import React from 'react';
import {makeStyles} from "@material-ui/styles";

import {NavLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSidebar from "./ListItemSidebar";
import ValueSidebarItem from "./ValueSidebarItem";

const useStyles = makeStyles({
  icon: {
    minWidth: "20px",
    width: "20px",
    marginRight: "20px",
  },
  activeLink: {
    color: "#140579",
    textDecorationColor: "#140579 !important",
    "& li, & > div": {
      background: "#FFC93A",
      color: "#140579",
    },
    "& svg .fill": {
      fill: "#140579",
    },
    "& svg .stroke": {
      stroke: "#140579",
    }
  },
});

export default function SidebarItem({text, count, icon, to, ...pass}) {
  const classes = useStyles();

  return <NavLink to={to} activeClassName={classes.activeLink} {...pass}>
    <ListItemSidebar button>
      <ListItemIcon className={classes.icon}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={text}/>
      {(count !== undefined) && <ValueSidebarItem value={count}/>}
    </ListItemSidebar>
  </NavLink>;
};
