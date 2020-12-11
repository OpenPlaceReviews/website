import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {usePromiseTracker} from "react-promise-tracker";

import {getTransaction} from "../../api/data";
import Loader from "../Loader";
import BlockInfo from "./BlockInfo";
import {List, ListItem, ListItemText} from "@material-ui/core";

const useStyles = makeStyles({
  h1: {
    marginBottom: "20px",
    fontSize: "40px",
    letterSpacing: "0.01em",
  },
  item: {
    marginBottom: "20px",
  },
  listItem: {
    paddingTop: 0,
    paddingBottom: 0,
    "& div": {
      margin: 0,
    }
  }
});

export default ({match}) => {
  const classes = useStyles();
  const {promiseInProgress} = usePromiseTracker();
  const [block, setBlock] = useState(null);
  const {params: { hash, blockId }} = match;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const block = await getTransaction(hash);
        setBlock(block);
      } catch (e) {
        console.log(e);
        console.warn('Network request failed');
      }
    };

    fetchData();
  }, []);

  if (!block || promiseInProgress) {
    return <Loader/>;
  }

  const {
    objects_type,
    objects,
  } = block;

  block.id = blockId;

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

  return <div className={classes.item}>
    <h1 className={classes.h1}>Transaction {block.shortHash}</h1>
    <BlockInfo block={block}>
      <p><strong>{block.objects.length}</strong> objects {operationType}</p>
      <p>Objects:</p>
      <List>
        {objectsList.map((o) => <ListItem className={classes.listItem} key={o}>
          <ListItemText><strong>{o}</strong></ListItemText>
        </ListItem>)}
      </List>
    </BlockInfo>
  </div>;
};
