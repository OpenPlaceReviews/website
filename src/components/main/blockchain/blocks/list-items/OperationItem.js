import React from "react";
import {createUseStyles} from "react-jss";

import {Link} from "react-router-dom";
import {List, ListItemText, ListItem} from "@material-ui/core";
import DataListItem from "./DataListItem";

const useStyles = createUseStyles({
  link: {
    color: "#2D69E0",
  },
  value: {
    color: "#000",
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    "& div": {
      margin: 0,
    }
  }
});

export default ({entity, params}) => {
  const {
    type,
    signed_by,
    hash,
    shortHash,
    objects_type,
    objects,
  } = entity;

  const { blockId } = params;

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

  let signedText;
  if (Array.isArray(signed_by)){
    signedText = signed_by.join(', ');
  } else {
    signedText = signed_by;
  }

  const classes = useStyles();
  const header = (<Link to={`/data/blocks/${blockId}/transactions/${hash}`} className={classes.link}>Operation type: {type}</Link>);
  const footer = <>Signed by: <span className={classes.value}>{signedText}</span></>;

  return <DataListItem json={entity} header={header} footer={footer} hash={shortHash}>
    <p><strong>{objects.length}</strong> objects {operationType}</p>
    <p>Objects:</p>
    <List>
      {objectsList.map((o) => <ListItem className={classes.listItem} key={o}>
        <ListItemText><strong>{o}</strong></ListItemText>
      </ListItem>)}
    </List>
  </DataListItem>;
}
