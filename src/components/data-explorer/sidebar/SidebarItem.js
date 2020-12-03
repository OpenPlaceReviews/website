import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

export default ({text, count, Icon}) => {
  return <ListItem button>
    <ListItemIcon>
      <Icon/>
    </ListItemIcon>
    <ListItemText primary={text} />
    {(count !== undefined) && <ListItemSecondaryAction>{count}</ListItemSecondaryAction>}
  </ListItem>;
};
