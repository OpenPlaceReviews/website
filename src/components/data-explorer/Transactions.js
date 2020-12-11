import React from 'react';

import { getQueue } from "../../api/data";
import List from "./List";
import OperationItem from "./list-items/OperationItem";

export default ({match}) => {
  const {params: { id }} = match;

  const params = {}
  if (isNaN(id)) {
    params.blockHash = id;
  } else {
    params.blockId = id;
  }

  let header = 'Transactions';

  if (!!params.blockId) {
    header = `Transactions Block#${params.blockId}`;
  } else if(!!params.blockHash) {
    header = `Transactions Block ${params.blockHash.substring(0, 16)}`;
  }

  return <List
    fetchMethod={getQueue}
    header={header}
    fetchParams={params}
    ListItem={OperationItem}
  />
};
