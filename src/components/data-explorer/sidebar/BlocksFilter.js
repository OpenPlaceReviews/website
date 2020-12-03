import React, {useEffect, useState} from 'react';
import SidebarItem from "./SidebarItem";
import BlocksIcon from "../icons/BlocksIcon";
import BlockIcon from "../icons/BlockIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {getBlocks} from "../../../api/data";

const BLOCKS_LIMIT = 3;

export default () => {
  const [blocksCount, setCount] = useState(0);
  const [lastBlock, setlastBlock] = useState('');
  const [hasMore, setHasMore] = useState(false);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let lastBlockValue = '';
        let limit = BLOCKS_LIMIT;
        if (lastBlock.includes(":")) {
          lastBlockValue = lastBlock.split(":").pop();
          limit = limit + 1;
        }

        const { blocks, count } = await getBlocks({
          limit,
          to: lastBlockValue,
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
      key={b.block_id}
      count={b.operations_size}
      text={`Block #${b.block_id}`}
      Icon={BlockIcon}
    />)
  }

  return <>
    <SidebarItem count={blocksCount} text="All blocks" Icon={BlocksIcon}/>
    {content}
    {(hasMore && blocks.length) &&
      <ListItem button>
        <ListItemText onClick={getMore} primary="Show more"/>
      </ListItem>
    }
  </>;
}
