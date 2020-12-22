import React from 'react';
import SummaryBlock from "./SummaryBlock";
import Value from "./Value";
import Selection from "./Selection";

export default function BlockInfo({block}) {
  const {hash, id, signed_by, operations_size} = block;

  let signedText;
  if (Array.isArray(signed_by)){
    signedText = signed_by.join(', ');
  } else {
    signedText = signed_by;
  }

  return <SummaryBlock>
    <p>Block id: <Selection>#{id}</Selection></p>
    <p>Hash: <Value>{hash}</Value></p>
    <p>Operations count: <Value>{operations_size}</Value></p>
    <p>Signed by: <Value>#{signedText}</Value></p>
  </SummaryBlock>;
};
