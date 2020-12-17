import React from 'react';

import { getQueue } from "../../../api/data";
import List from "./blocks/List";
import OperationItem from "./blocks/list-items/OperationItem";

export default () => {
  return <List
    fetchMethod={getQueue}
    header="Queue"
    ListItem={OperationItem}
  />
};
