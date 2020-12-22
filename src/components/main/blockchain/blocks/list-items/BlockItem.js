import React from "react";
import DataListItem from "./DataListItem";
import Value from "../Value";

export default function BlockItem({block}) {
  const {
    id,
    operations_size,
    block_date
  } = block;

  return <DataListItem block={block} title={`Block #${id}`} link={`/data/block/${id}`}>
    <p>Operations count: <Value>{operations_size}</Value></p>
    <p>Date: <Value>{block_date}</Value></p>
  </DataListItem>;
}
