import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ValueSidebarItem from "./ValueSidebarItem";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    font: "IBM Ples Sans",
    fontWeight: 600,
    color: "#56627A",
    "& span": {
      fontWeight: "bold",
    }
  },
});

export default function SidebarHeader({text, count}) {
  const classes = useStyles();

  return <ListItem>
    <ListItemText primary={text} className={classes.root}/>
    {(count !== undefined) && <ValueSidebarItem value={count}/>}
  </ListItem>;
};
