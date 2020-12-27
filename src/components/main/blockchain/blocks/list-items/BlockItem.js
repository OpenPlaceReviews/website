import React from "react";
import DataListItem from "./DataListItem";
import Value from "../Value";

export default function BlockItem({block}) {
  const {
    block_id,
    operations_size,
    date,
    clientData: {
      shortHash,
      signedByStr,
    }
  } = block;

  return <DataListItem
      block={block}
      title={`Block #${block_id}`}
      link={`/data/block/${block_id}`}
      signedBy={signedByStr}
      shortId={shortHash}
  >
    <p>Operations count: <Value>{operations_size}</Value></p>
    <p>Date: <Value>{date}</Value></p>
  </DataListItem>;
}
