import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {List, ListItem, ListItemText} from "@material-ui/core";
import DataListItem from "./DataListItem";

const useStyless = makeStyles({
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    "& div": {
      margin: 0,
    }
  }
})

export default function OperationItem({block}) {
  const classes = useStyless();
  const {
    type,
    objects_type,
    objects,
  } = block;

  let operationType = "";
  if (objects_type === 'create') {
    operationType = 'added'
  }
  if (objects_type === 'edit') {
    operationType = 'edited'
  }
  if (objects_type === 'delete') {
    operationType = 'removed'
  }
  const objectsList = objects.map((o) => {
    if (Array.isArray(o.id)) {
      return o.id.join(', ');
    }

    return o.id;
  });

  const title = `Operation type: ${type}`;

  return <DataListItem block={block} title={title} link={"/"}>
    <p><strong>{objects.length}</strong> objects {operationType}</p>
    <p>Objects:</p>
    <List>
      {objectsList.map((o) => <ListItem className={classes.listItem} key={o}>
        <ListItemText><strong>{o}</strong></ListItemText>
      </ListItem>)}
    </List>
  </DataListItem>;
};
