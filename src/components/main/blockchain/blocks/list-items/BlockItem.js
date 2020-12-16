import React from "react";
import {createUseStyles} from "react-jss";

import {Link} from "react-router-dom";
import DataListItem from "./DataListItem";

const useStyles = createUseStyles();

export default ({entity}) => {
  const {
    id,
    signed_by,
    hash,
    shortHash,
    operations_size,
    block_date
  } = entity;

  const classes = useStyles();
  const header = (<Link to={`/data/blocks/${hash}`} className={classes.link}>Block #{id}</Link>);
  const hashLink = (<Link to={`/data/blocks/${hash}`} className={classes.link}>{shortHash}</Link>);
  const footer = <>Signed by: <span className={classes.value}>{signed_by}</span></>;

  return <DataListItem json={entity} header={header} footer={footer} hash={hashLink}>
    <p>Operations count: <span className={classes.value}>{operations_size}</span></p>
    <p>Date: <span className={classes.value}>{block_date}</span></p>
  </DataListItem>;
}
