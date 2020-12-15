import React from 'react';

import { getQueue } from "../../../api/data";
import List from "./blocks/List";
import OperationItem from "./blocks/list-items/OperationItem";

export default ({match}) => {
  const {params} = match;
  const header = `Transactions Block#${params.blockId}`;

  return <List
    fetchMethod={getQueue}
    header={header}
    fetchParams={params}
    ListItem={OperationItem}
  />
};
