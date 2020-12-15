import React, {useEffect, useState} from 'react';
import SidebarItem from "./SidebarItem";
import BlocksIcon from "../../assets/icons/BlocksIcon";
import BlockIcon from "../../assets/icons/BlockIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {getBlocks} from "../../../../../api/data";
import ListItemSidebar from "./ListItemSidebar";
import {makeStyles} from "@material-ui/styles";

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

const BLOCKS_LIMIT = 3;

export default () => {
  const [blocksCount, setCount] = useState(0);
  const [lastBlock, setlastBlock] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [blocks, setBlocks] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let limit = BLOCKS_LIMIT;
        if (lastBlock.length) {
          limit = limit + 1;
        }

        const { blocks, count } = await getBlocks({
          limit,
          to: lastBlock,
        });

        if (!!lastBlock) {
          blocks.shift();
        }

        setHasMore(blocks.length > 0);
        setBlocks((existsBlocks) => [
          ...existsBlocks,
          ...blocks,
        ]);
        setCount(count);
      } catch (e) {
        console.warn('Network request failed');
      }
    };

    fetchData();
  }, [lastBlock]);

  const getMore = () => {
    const [ last ] = blocks.slice(-1);
    setlastBlock(last.hash);
  }

  let content;
  if (blocks.length) {
    content = blocks.map((b) => <SidebarItem
      count={b.operations_size}
      text={`Block #${b.block_id}`}
      Icon={BlockIcon}
      to={`/data/blocks/${b.block_id}/transactions`}
      key={b.block_id}
    />)
  }

  return <>
    <SidebarItem
      exact
      count={blocksCount}
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