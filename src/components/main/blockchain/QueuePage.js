import React, {useEffect, useState} from 'react';

import { getQueue } from "../../../api/data";

import {Box} from "@material-ui/core";
import OperationItem from "./blocks/list-items/OperationItem";
import Loader from "../blocks/Loader";
import BlocksList from "./blocks/BlocksList";
import BlocksHeader from "./blocks/BlocksHeader";

export default () => {
  const [state, setState] = useState({
    queue: [],
    loading: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let queue;
      try {
        const results = await getQueue();
        queue = results.queue;
      } catch (error) {
        setError(error)
      }

      setState({
        queue,
        loading: false,
      });
    };

    fetchData();
  }, []);

  if (error) {
    throw error;
  }

  let content;
  const {loading, queue} = state;
  if (!loading) {
    if (queue.length) {
      content = queue.map((op) => <OperationItem key={op.shortHash} block={op}/>)
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }
  } else {
    content = <Loader/>;
  }

  return <BlocksList>
    <BlocksHeader>Queue</BlocksHeader>
    {content}
  </BlocksList>;
};
