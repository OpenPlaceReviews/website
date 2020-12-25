import React, {useContext, useEffect, useState} from 'react';

import { getQueue } from "../../../api/data";

import {Box} from "@material-ui/core";
import OperationItem from "./blocks/list-items/OperationItem";
import Loader from "../blocks/Loader";
import BlocksList from "./blocks/BlocksList";
import BlocksHeader from "./blocks/BlocksHeader";
import SummaryBlock from "./blocks/SummaryBlock";
import Value from "./blocks/Value";
import OperationsContext from "./providers/OperationsContext";

export default function QueuePage() {
  const {types} = useContext(OperationsContext);
  const [state, setState] = useState({
    queue: [],
    count: 0,
    loading: true,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let queue;
      let count;
      try {
        const results = await getQueue();
        queue = results.queue;
        count = results.count;
      } catch (error) {
        setError(error)
      }

      setState({
        queue,
        count,
        loading: false,
      });
    };

    fetchData();
  }, []);

  if (error) {
    throw error;
  }

  let content;
  let oldestOp;
  let newestOp;
  let stat = [];
  const {loading, queue, count} = state;
  if (!loading) {
    if (queue.length) {
      content = queue.map((op) => <OperationItem key={op.hash} operation={op}/>)

      const sortedByDate = queue.sort((a, b) => a.eval.timestamp - b.eval.timestamp);
      oldestOp = sortedByDate.slice(-1)[0];
      newestOp = sortedByDate[0];

      const opsCount = {};
      queue.forEach((op) => {
        const {type} = op;
        if (opsCount[type]) {
          opsCount[type]++
        } else {
          opsCount[type] = 1;
        }
      });

      const opsTypes = Object.keys(opsCount);
      stat = opsTypes.map((type) => {
        const OpClass = types[type];
        return `${opsCount[type]} ${OpClass.getPluralName()}`;
      })
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }
  } else {
    return <Loader/>;
  }

  return <BlocksList>
    <BlocksHeader>Queue</BlocksHeader>

    <SummaryBlock>
      <p>Operations in queue: <Value>{count}</Value></p>
      {oldestOp && (<p>Oldest operation: <Value>{`'${oldestOp.type}' by ${oldestOp.clientData.signedByStr}`}</Value></p>)}
      {newestOp && (<p>Newest operation: <Value>{`'${newestOp.type}' by ${newestOp.clientData.signedByStr}`}</Value></p>)}
      {stat.length > 0 && (<p>Operations description: <Value>{stat.join(', ')}</Value></p>)}
    </SummaryBlock>

    {content}
  </BlocksList>;
};
