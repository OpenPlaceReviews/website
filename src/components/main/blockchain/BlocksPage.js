import React, {useEffect, useState} from 'react';

import {Box, Button} from "@material-ui/core";
import { usePromiseTracker } from "react-promise-tracker";

import { getBlocks } from "../../../api/data";
import config from "../../../config";

import BlockItem from "./blocks/list-items/BlockItem";
import Loader from "../blocks/Loader";
import BlocksList from "./blocks/BlocksList";
import BlocksHeader from "./blocks/BlocksHeader";

const BLOCKS_PER_PAGE = config.blockchain.blocksPageLimit;

export default function BlocksPage() {
  const [load, setLoad] = useState(true);
  const [state, setState] = useState({
    hasMore: false,
    lastBlock: '',
    blocks: [],
    isLoaded: false,
    error: null,
  });
  const [error, setError] = useState(null);
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    const fetchData = async () => {
      let results;
      const limit = BLOCKS_PER_PAGE + 1;
      try {
        results = await getBlocks({
          limit,
          to: state.lastBlock,
        });
      } catch (error) {
        setError(error)
        return;
      }

      const {blocks: newBlocks, count} = results;

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
    };

    if (load && !error) {
      fetchData();
    }
  }, [load]);

  if (error) {
    throw error;
  }

  let content;
  if (state.isLoaded) {
    if (state.blocks.length) {
      content = state.blocks.map((b) => <BlockItem key={b.hash} block={b}/>)
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }
  }

  return <BlocksList>
      <BlocksHeader>Blocks</BlocksHeader>

      {content}

      {state.hasMore && <Box display="flex" justifyContent="center">
        <Button onClick={() => setLoad(true)}>Show more</Button>
      </Box>}

      {promiseInProgress && <Loader/>}
    </BlocksList>;
};
