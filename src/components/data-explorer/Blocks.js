import React, {useEffect, useState} from 'react';

import {Box, Button, Grid} from "@material-ui/core";
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

const BLOCKS_PER_PAGE = 3;

export default () => {
  const [objectsList, setObjects] = useState([]);
  const [lastBlock, setlastBlock] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let lastBlockValue = '';
        let limit = BLOCKS_PER_PAGE;
        if (lastBlock.includes(":")) {
          lastBlockValue = lastBlock.split(":").pop();
          limit = limit + 1;
        }

        const blocks = await getBlocks({
          limit,
          to: lastBlockValue,
        });

        setHasMore(blocks.length > 0);
        setObjects((existsBlocks) => [
          ...existsBlocks,
          ...blocks,
        ]);
      } catch (e) {
        console.warn('Network request failed');
      }
    };

    fetchData();
  }, [lastBlock]);

  const getMore = () => {
    const [ last ] = objectsList.slice(-1);
    setlastBlock(last.hash);
  }

  let content;
  if (objectsList.length) {
    content = objectsList.map((entity) => <BlockItem key={entity.block_id} entity={entity}/>)
  } else {
    content = (<Box display="flex" justifyContent="center"><p className={classes.noContent}>No entities available</p></Box>);
  }

  return <div>
    <h1 className={classes.h1}>Blocks</h1>
    <Grid container justify="center" spacing={3}>
      <Grid item xs={9}>
        <div className={classes.list}>
          {content}
          <Loader/>
          {hasMore && <Box display="flex" justifyContent="center">
            <Button onClick={getMore}>Show more</Button>
          </Box>}
        </div>
      </Grid>
      <Grid item xs={3}>
        <Sidebar/>
      </Grid>
    </Grid>
  </div>;
};
