import React from 'react';
import SummaryBlock from "./SummaryBlock";
import Value from "./Value";
import Selection from "./Selection";

export default function BlockInfo({block}) {
  const {hash, block_id, operations_size} = block;
  const {signedByStr} = block.clientData;

  return <SummaryBlock>
    <p>Block id: <Selection>#{block_id}</Selection></p>
    <p>Hash: <Value>{hash}</Value></p>
    <p>Operations count: <Value>{operations_size}</Value></p>
    <p>Signed by: <Value>#{signedByStr}</Value></p>
  </SummaryBlock>;
};
