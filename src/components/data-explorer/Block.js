import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {usePromiseTracker} from "react-promise-tracker";

import {getBlocks} from "../../api/data";
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
  const {promiseInProgress} = usePromiseTracker();
  const [block, setBlock] = useState({});
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

  return <div>
    <h1 className={classes.h1}>Block #{block.block_id}</h1>
    <Item block={block}>
      <p>Operations count: <span>{block.operations_size}</span></p>
    </Item>
  </div>;
};
