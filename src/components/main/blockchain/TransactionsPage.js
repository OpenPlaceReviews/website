import React, {useEffect, useState} from 'react';

import {getBlock, getBlockTransactions} from "../../../api/data";
import {useParams} from "react-router";

import {Box} from "@material-ui/core";
import Loader from "../blocks/Loader";
import OperationItem from "./blocks/list-items/OperationItem";
import BlockInfo from "./blocks/BlockInfo";
import SummaryBlock from "./blocks/SummaryBlock";
import Value from "./blocks/Value";
import BlocksList from "./blocks/BlocksList";
import BlocksHeader from "./blocks/BlocksHeader";
import Error404 from "../Error404";

export default () => {
  const {param} = useParams();
  const [state, setState] = useState({
    operations: [],
    count: 0,
    block: null,
    loading: true,
  });
  const [error, setError] = useState(null);
  const {loading, operations, block, count} = state;

  useEffect(() => {
    const fetchData = async () => {
      let block;
      let blockId = null;
      let hash = null;
      if (Number(param) > 0) {
        blockId = param;
      } else {
        hash = param;
      }

      try {
        block = await getBlock({blockId, hash});
      } catch(error) {
        setError(error);
        return;
      }

      setState({
        ...state,
        block,
        loading: false,
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let operations;
      let count;
      try {
        const results = await getBlockTransactions({ blockId: block.id });
        operations = results.operations;
        count = results.count;
      } catch (error) {
        setError(error);
      }

      setState({
        ...state,
        operations,
        count,
      });
    };

    if (!loading) {
      fetchData();
    }
  }, [loading]);

  if (error) {
    if (error.code === 404) {
      return <Error404/>;
    }

    throw error;
  }

  let content;
  if (!loading) {
    if (operations.length) {
      content = operations.map((op) => <OperationItem key={op.shortHash} block={op}/>)
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }
  } else {
    return <Loader/>;
  }

  return <BlocksList>
    <BlocksHeader>{`Transactions Block#${block.id}`}</BlocksHeader>

    <BlockInfo block={block}/>
    <SummaryBlock>
      <p>Operaioons in queue: <Value>{count}</Value></p>
      <p>Oldest operation: <Value></Value></p>
      <p>Newest operation: <Value></Value></p>
      <p>Operations description: <Value></Value></p>
    </SummaryBlock>

    {content}
  </BlocksList>;
};
