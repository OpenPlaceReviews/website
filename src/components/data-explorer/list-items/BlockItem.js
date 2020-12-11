import React from "react";
import {createUseStyles} from "react-jss";

import {Link} from "react-router-dom";
import DataListItem from "./DataListItem";

const useStyles = createUseStyles({
  link: {
    color: "#2D69E0",
  },
  value: {
    color: "#000",
  },
});

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
  const footer = <>Signed by: <span className={classes.value}>{signed_by}</span></>;

  return <DataListItem json={entity} header={header} footer={footer} hash={shortHash}>
    <p>Operations count: <span className={classes.value}>{operations_size}</span></p>
    <p>Date: <span className={classes.value}>{block_date}</span></p>
  </DataListItem>;
}
