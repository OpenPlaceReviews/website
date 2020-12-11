import React from 'react';

import { getQueue } from "../../api/data";
import List from "./List";
import OperationItem from "./list-items/OperationItem";

export default () => {
  return <List
    fetchMethod={getQueue}
    header="Queue"
    ListItem={OperationItem}
  />
};
