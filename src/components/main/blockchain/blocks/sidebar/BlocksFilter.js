import React, {useEffect, useState} from 'react';

import {makeStyles} from "@material-ui/styles";
import {getBlocks} from "../../../../../api/data";

import ListItemText from "@material-ui/core/ListItemText";
import SidebarItem from "./SidebarItem";
import ListItemSidebar from "./ListItemSidebar";
import BlocksIcon from "../../assets/icons/BlocksIcon";
import BlockIcon from "../../assets/icons/BlockIcon";

import config from "../../../../../config";

const useStyles = makeStyles({
  allBlocks: {
    "& span": {
      fontWeight: "bold",
    }
  },
  showMore: {
    marginLeft: "35px",
    color: "#2D69E0",
  }
});

const BLOCKS_LIMIT = config.blockchain.blocksSidebarLimit;

export default function BlocksFilter() {
  const [lastBlock, setlastBlock] = useState('');
  const [state, setState] = useState({
    blocks: [],
    hasMore: false,
    count: 0,
  });
  const [error, setError] = useState(null);
  const {blocks, hasMore, count} = state;

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      let limit = BLOCKS_LIMIT;
      if (!!lastBlock) {
        limit = limit + 1;
      }

      let results;
      try {
        results = await getBlocks({
          limit,
          to: lastBlock,
        });
      } catch (error) {
        setError(error);
        return;
      }
      const {blocks: newBlocks, count} = results;

      if (!!lastBlock) {
        newBlocks.shift();
      }

      const newState = { ...state };
      newState.blocks = newState.blocks.concat(newBlocks);
      newState.hasMore = newState.blocks.length < count;
      newState.count = count;

      setState(newState);
    };

    fetchData();
  }, [lastBlock]);

  if (error) {
    throw error;
  }

  const getMore = () => {
    const [ last ] = blocks.slice(-1);
    setlastBlock(last.clientData.rawHash);
  }

  let content;
  if (blocks.length) {
    content = blocks.map((b) => <SidebarItem
      count={b.operations_size}
      text={`Block #${b.block_id}`}
      Icon={BlockIcon}
      to={`/data/block/${b.block_id}/transactions`}
      key={b.block_id}
    />)
  }

  return <>
    <SidebarItem
      exact
      count={count}
      className={classes.allBlocks}
      text="All blocks"
      Icon={BlocksIcon}
      to={`/data/blocks`}
    />
    {content}
    {(hasMore && blocks.length) &&
      <ListItemSidebar button>
        <ListItemText onClick={getMore} primary="Show more"/>
      </ListItemSidebar>
    }
  </>;
}
