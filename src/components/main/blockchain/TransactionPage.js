import React, {useEffect, useState} from 'react';
import {usePromiseTracker} from "react-promise-tracker";

import {getTransaction} from "../../../api/data";
import Loader from "../blocks/Loader";
import BlocksHeader from "./blocks/BlocksHeader";
import Error404 from "../Error404";
import SummaryBlock from "./blocks/SummaryBlock";
import Value from "./blocks/Value";

export default ({match}) => {
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

  const {signed_by} = block;
  let signedText;
  if (Array.isArray(signed_by)){
    signedText = signed_by.join(', ');
  } else {
    signedText = signed_by;
  }

  let objects;
  let summary;
  if (block.action === 'delete') {
    objects = block.old;
    summary = 'Objects deleted: ';
  } else if (block.action === 'create') {
    objects = block.new;
    summary = 'Objects created:';
  } else {
    objects = block.edit;
    summary = 'Objects modifed:';
  }

  return <div>
    <BlocksHeader>Transaction {block.shortHash}</BlocksHeader>
    <SummaryBlock>
      <p>Hash: <Value>{hash}</Value></p>
      <p>{summary} <Value>{objects.length}</Value></p>
      <p>Signed by: <Value>#{signedText}</Value></p>
    </SummaryBlock>
  </div>;
};
