import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {usePromiseTracker} from "react-promise-tracker";

import {getBlocks} from "../../api/data";
import Breadcrumbs from "./Breadcrumbs";
import Loader from "../Loader";
import Item from "./Item";

const useStyles = makeStyles({
  h1: {
    marginBottom: "20px",
    fontSize: "40px",
    letterSpacing: "0.01em",
  },
});

export default ({match}) => {
  const classes = useStyles();
  const [block, setBlock] = useState({});
  const { promiseInProgress } = usePromiseTracker();
  const {params: { hash }} = match;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { blocks } = await getBlocks({
          limit: 1,
          to: hash,
        });

        setBlock(blocks[0]);
      } catch (e) {
        console.warn('Network request failed');
      }
    };

    fetchData();
  }, []);

  if (!block || promiseInProgress) {
    return <Loader/>;
  }

  const crumbs = [
    {url: '/data', text: 'Data'},
    {url: '/data/blocks', text: 'Blocks'},
    {url: `/data/blocks/${hash}`, text: `Block #${block.block_id}`},
  ];

  return <div>
    <Breadcrumbs crumbs={crumbs}/>
    <h1 className={classes.h1}>Block #{block.block_id}</h1>
    <Item block={block}>
      <p>Operations count: <span>{block.operations_size}</span></p>
    </Item>
  </div>;
};
