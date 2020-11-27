import React from "react";
import {createUseStyles} from "react-jss";

import ListItem from "./ListItem";

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
    block_id,
    signed_by,
    hash,
    operations_size,
    date: block_date
  } = entity;

  const classes = useStyles();
  const header = <a href="#" className={classes.link}>Block #{block_id}</a>;
  const footer = <>Signed by: <span className={classes.value}>{signed_by}</span></>;

  return <ListItem json={entity} header={header} footer={footer} hash={hash}>
    <p>Operations count: <span className={classes.value}>{operations_size}</span></p>
    <p>Date: <span className={classes.value}>{block_date}</span></p>
  </ListItem>;
}
