import React, {useEffect, useState} from 'react';

import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import { usePromiseTracker } from "react-promise-tracker";

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
    marginBottom: "20px",
  },
});

export default ({fetchMethod, fetchParams, header, blocks = [], ListItem}) => {
  const [state, setState] = useState({
    blocks: blocks,
    isLoaded: false,
  });

  const classes = useStyles();
  const { promiseInProgress } = usePromiseTracker();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { queue: blocks } = await fetchMethod(fetchParams);

        setState({
          blocks,
          isLoaded: true,
        });
      } catch (e) {
        console.warn('Network request failed transactions');
      }
    };

    fetchData();
  }, [fetchParams]);

  let content;
  if (state.isLoaded) {
    if (state.blocks.length) {
      content = state.blocks.map((b) => <ListItem key={b.shortHash} entity={b}/>)
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }
  }

  return <div className={classes.list}>
    <h1 className={classes.h1}>{header}</h1>

    {content}

    {promiseInProgress && <Loader/>}
  </div>;
};
