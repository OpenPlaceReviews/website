import React, {useEffect, useState} from 'react';
import {usePromiseTracker} from "react-promise-tracker";

import {getTransaction} from "../../../api/data";
import Loader from "../blocks/Loader";
import BlocksHeader from "./blocks/BlocksHeader";
import Error404 from "../Error404";
import SummaryBlock from "./blocks/SummaryBlock";
import Value from "./blocks/Value";
import JSONViewer from "./blocks/JSONViewer/JSONViewer";
import ObjectsSummary from "./blocks/ObjectsSummary";

export default function TransactionPage({match}) {
  const {promiseInProgress} = usePromiseTracker();
  const [error, setError] = useState(null);
  const [state, setState] = useState({
    block: null,
    loading: true,
  });

  const {params: { hash }} = match;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const block = await getTransaction(hash);
        setState({
          block,
          loading: false,
        });
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [hash]);

  if (error) {
    if (error.code === 404) {
      return <Error404/>;
    }

    throw error;
  }

  const {loading, block} = state;
  if (loading || promiseInProgress) {
    return <Loader/>;
  }

  const {signedByStr, shortHash} = block.clientData;
  return <div>
    <BlocksHeader>Transaction {shortHash}</BlocksHeader>
    <SummaryBlock>
      <p>Hash: <Value>{block.hash}</Value></p>
      <ObjectsSummary op={block}/>
      <p>Signed by: <Value>#{signedByStr}</Value></p>
    </SummaryBlock>
    <JSONViewer open={true} json={block}/>
  </div>;
};
