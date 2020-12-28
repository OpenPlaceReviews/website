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
  const [lastBlock, setlastBlock] = useState('');
  const [state, setState] = useState({
    hasMore: false,
    blocks: [],
    loading: true,
  });
  const [error, setError] = useState(null);
  const { promiseInProgress } = usePromiseTracker();
  const {blocks, loading, hasMore} = state;

  useEffect(() => {
    const fetchData = async () => {
      let limit = BLOCKS_PER_PAGE;
      if (!!lastBlock.length) {
        limit = limit + 1;
      }

      let results;
      try {
        results = await getBlocks({
          limit,
          to: lastBlock,
        });
      } catch (error) {
        setError(error)
        return;
      }

      const {blocks: newBlocks, count} = results;

      if (!!lastBlock) {
        newBlocks.shift();
      }

      const newState = { ...state };
      newState.blocks = newState.blocks.concat(newBlocks);
      newState.hasMore = newState.blocks.length < count;
      newState.loading = false;

      setState(newState);
    };

    if (!error) {
      fetchData();
    }
  }, [lastBlock]);

  if (error) {
    throw error;
  }

  const getMore = () => {
    const [ last ] = blocks.slice(-1);
    setlastBlock(last.clientData.rawHash);
  }

  let content;
  if (!loading) {
    if (blocks.length) {
      content = blocks.map((b) => <BlockItem key={b.hash} block={b}/>)
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }
  }

  return <BlocksList>
      <BlocksHeader>Blocks</BlocksHeader>

      {content}

      {(hasMore && blocks.length) && <Box display="flex" justifyContent="center">
        <Button onClick={getMore}>Show more</Button>
      </Box>}

      {promiseInProgress && <Loader/>}
    </BlocksList>;
};
