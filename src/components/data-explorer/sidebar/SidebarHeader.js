import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default ({text, count}) => {
  return <ListItem>
    <ListItemText primary={text}/>
    {(count !== undefined) && <ListItemSecondaryAction>{count}</ListItemSecondaryAction>}
  </ListItem>;
};
