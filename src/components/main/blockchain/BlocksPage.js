import React, {useEffect, useState} from 'react';

import {Box, Button} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { usePromiseTracker } from "react-promise-tracker";

import { getBlocks } from "../../../api/data";
import BlockItem from "./blocks/list-items/BlockItem";
import Loader from "../blocks/Loader";

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
  const [load, setLoad] = useState(true);
  const [state, setState] = useState({
    hasMore: false,
    lastBlock: '',
    blocks: [],
    isLoaded: false,
  });

  const classes = useStyles();
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limit = BLOCKS_PER_PAGE + 1;
        const { blocks: newBlocks, count } = await getBlocks({
          limit,
          to: state.lastBlock,
        });

        const newState = { ...state };

        if (newBlocks.length === limit) {
          const lastBlock = newBlocks.pop();
          newState.lastBlock = lastBlock.hash;
        }

        newState.blocks = newState.blocks.concat(newBlocks);
        newState.hasMore = newState.blocks.length < count;
        newState.isLoaded = true;

        setState(newState);
        setLoad(false);
      } catch (e) {
        console.warn('Network request failed');
      }
    };

    if (load) {
      fetchData();
    }
  }, [load]);

  let content;
  if (state.isLoaded) {
    if (state.blocks.length) {
      content = state.blocks.map((b) => <BlockItem key={b.id} entity={b}/>)
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }
  }

  return <div className={classes.list}>
      <h1 className={classes.h1}>Blocks</h1>

      {content}

      {state.hasMore && <Box display="flex" justifyContent="center">
        <Button onClick={() => setLoad(true)}>Show more</Button>
      </Box>}

      {promiseInProgress && <Loader/>}
    </div>;
};
