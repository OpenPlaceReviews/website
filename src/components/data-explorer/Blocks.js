import React, {useEffect, useState} from 'react';

import { getBlocks } from "../../api/data";
import BlockItem from "./list-items/BlockItem";
import ListEntity from "./ListEntity";
import {Grid} from "@material-ui/core";
import Sidebar from "./Sidebar";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
  h1: {
    marginBottom: "20px",
    fontSize: "40px",
    letterSpacing: "0.01em",
  }
})

export default () => {
  const [blocksList, setBlocks] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blocks = await getBlocks();
        setBlocks(blocks);
      } catch (e) {
        console.warn('Network request failed');
      }
    };

    fetchData();
  }, []);

  return <div>
    <h1 className={classes.h1}>Blocks</h1>
    <Grid container justify="center" spacing={3}>
      <Grid item xs={10}>
        <ListEntity data={blocksList} Component={BlockItem} keyName="block_id"/>
      </Grid>
      <Grid item xs={2}>
        <Sidebar/>
      </Grid>
    </Grid>
  </div>;
};
