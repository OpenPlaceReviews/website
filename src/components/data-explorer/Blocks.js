import React, {useEffect, useState} from 'react';

import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

import { getBlocks } from "../../api/data";
import BlockItem from "./list-items/BlockItem";
import Sidebar from "./Sidebar";
import Loader from "../Loader";

const useStyles = makeStyles({
  h1: {
    marginBottom: "20px",
    fontSize: "40px",
    letterSpacing: "0.01em",
  },
  list: {
    borderTop: "1px solid #E4E8F2",
    position: "relative",
    minHeight: "200px",
    paddingBottom: "20px",
  },
});

export default () => {
  const [objectsList, setObjects] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blocks = await getBlocks();
        setObjects(blocks);
      } catch (e) {
        console.warn('Network request failed');
      }
    };

    fetchData();
  }, []);

  let content;
  if (objectsList === null) {
    content = <Loader/>;
  } else if (objectsList.length) {
    content = objectsList.map((entity) => <BlockItem key={entity.block_id} entity={entity}/>)
  } else {
    content = "No entities available"
  }

  return <div>
    <h1 className={classes.h1}>Blocks</h1>
    <Grid container justify="center" spacing={3}>
      <Grid item xs={9}>
        <div className={classes.list}>
          {content}
        </div>
      </Grid>
      <Grid item xs={3}>
        <Sidebar/>
      </Grid>
    </Grid>
  </div>;
};
