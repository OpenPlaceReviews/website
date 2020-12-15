import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ValueSidebarItem from "./ValueSidebarItem";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    "& span": {
      fontWeight: "bold",
    }
  },
});

export default ({text, count}) => {
  const classes = useStyles();

  return <ListItem>
    <ListItemText primary={text} className={classes.root}/>
    {(count !== undefined) && <ValueSidebarItem value={count}/>}
  </ListItem>;
};
