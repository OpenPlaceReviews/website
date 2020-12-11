import React, {useEffect, useState} from 'react';
import SidebarItem from "./SidebarItem";
import BlocksIcon from "../icons/BlocksIcon";
import BlockIcon from "../icons/BlockIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {getBlocks} from "../../../api/data";
import {NavLink} from "react-router-dom";

const BLOCKS_LIMIT = 3;

export default () => {
  const [blocksCount, setCount] = useState(0);
  const [lastBlock, setlastBlock] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [blocks, setBlocks] = useState([]);

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
    content = blocks.map((b) => <NavLink to={`/data/blocks/${b.block_id}/transactions`} key={b.block_id}>
        <SidebarItem
          count={b.operations_size}
          text={`Block #${b.block_id}`}
          Icon={BlockIcon}
        />
    </NavLink>)
  }

  return <>
    <NavLink to={`/data/blocks`} exact>
      <SidebarItem count={blocksCount} text="All blocks" Icon={BlocksIcon}/>
    </NavLink>
    {content}
    {(hasMore && blocks.length) &&
      <ListItem button>
        <ListItemText onClick={getMore} primary="Show more"/>
      </ListItem>
    }
  </>;
}
