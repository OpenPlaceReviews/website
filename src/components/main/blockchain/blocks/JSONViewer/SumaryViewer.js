import React, {useState} from 'react';
import JSONViewer from "./JSONViewer";
import ExpandBtn from "./ExpandBtn";

export default function SummaryViewer({block}) {
  const [open, expand] = useState(true);

  const onExpandClick = (e) => {
    e.preventDefault();
    expand(!open);
  };

  return <div>
    <ExpandBtn onClick={onExpandClick}/>
    <JSONViewer open={open} json={block}/>
  </div>;
};
