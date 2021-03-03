import React from "react";

import blockIcon from "../../../../../assets/images/blockchain_icons/blockchain.svg";

import DataListItem from "./DataListItem";
import Value from "../Value";
import Icon from "../Icon";

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

  const IconComponent = <Icon url={blockIcon}/>;
  return <DataListItem
      block={block}
      title={`Block #${block_id}`}
      objLink={`/data/block/${block_id}/transactions`}
      transLink = {`/data/block/${block_id}/transactions`}
      signedBy={signedByStr}
      icon={IconComponent}
      shortId={shortHash}
  >
    <p>Operations count: <Value>{operations_size}</Value></p>
    <p>Date: <Value>{date}</Value></p>
  </DataListItem>;
}
