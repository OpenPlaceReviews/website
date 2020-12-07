import React from 'react';
import JSONViewer from "./JSONViewer";

export default ({block, children}) => {
  return <div>
    <div>
      <p>Block id: <span>#{block.block_id}</span></p>
      <p>Block Hash: <span>{block.hash}</span></p>
      {children}
      <p>Signed by: <span>#{block.signed_by}</span></p>
    </div>
    <JSONViewer json={block} open={true}/>
  </div>;
};
