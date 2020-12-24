import React, {useContext, useEffect, useState} from 'react';

import {getBlock, getBlockTransactions} from "../../../api/data";
import {useParams} from "react-router";
import {usePromiseTracker} from "react-promise-tracker";
import {makeStyles} from "@material-ui/styles";

import {Box} from "@material-ui/core";
import Loader from "../blocks/Loader";
import OperationItem from "./blocks/list-items/OperationItem";
import BlockInfo from "./blocks/BlockInfo";
import SummaryBlock from "./blocks/SummaryBlock";
import Value from "./blocks/Value";
import BlocksList from "./blocks/BlocksList";
import BlocksHeader from "./blocks/BlocksHeader";
import Error404 from "../Error404";
import FilterOperations from "./blocks/FilterOperations";
import OperationsContext from "./providers/OperationsContext";

const useStyles = makeStyles({
  header: {
    alignItems: "center",
    justifyContent: "space-between",
  }
});

export default () => {
  const classes = useStyles()
  const {types} = useContext(OperationsContext);
  const { promiseInProgress } = usePromiseTracker();
  const {param} = useParams();
  const [state, setState] = useState({
    operations: [],
    count: 0,
    block: null,
    loading: true,
  });
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');
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
  }, [param]);

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
  }, [loading, block]);

  if (error) {
    if (error.code === 404) {
      return <Error404/>;
    }

    throw error;
  }

  const selectedOps = operations.filter((op) => {
    if (!filter) return true;
    return op.type === filter;
  });

  let content;
  let oldestOp;
  let newestOp;
  let stat = [];
  if (!loading && !promiseInProgress) {
    if (selectedOps.length) {
      content = selectedOps.map((op) => <OperationItem key={op.shortHash} operation={op}/>)
    } else {
      content = (<Box display="flex" justifyContent="center"><p>No blocks available</p></Box>);
    }

    if (operations.length) {
      const sortedByDate = operations.sort((a, b) => a.eval.timestamp - b.eval.timestamp);
      oldestOp = sortedByDate.slice(-1)[0];
      newestOp = sortedByDate[0];

      const opsCount = {};
      operations.forEach((op) => {
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
    }
  } else {
    return <Loader/>;
  }

  return <BlocksList>
    <Box display="flex" className={classes.header}>
      <BlocksHeader>{`Transactions Block#${block.id}`}</BlocksHeader>
      <FilterOperations onChange={setFilter} value={filter}/>
    </Box>

    <BlockInfo block={block}/>
    <SummaryBlock>
      <p>Operaioons in queue: <Value>{count}</Value></p>
      {oldestOp && (<p>Oldest operation: <Value>{`'${oldestOp.type}' by ${oldestOp.signed_by}`}</Value></p>)}
      {newestOp && (<p>Newest operation: <Value>{`'${newestOp.type}' by ${newestOp.signed_by}`}</Value></p>)}
      {stat.length && (<p>Operations description: <Value>{stat.join(', ')}</Value></p>)}
    </SummaryBlock>

    {content}
  </BlocksList>;
};
