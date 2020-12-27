import React from 'react';
import DataListItem from "./DataListItem";

import useFormatting from "../../hooks/useFormatting";
import ObjectsSummary from "../ObjectsSummary";

export default function OperationItem({operation}) {
  const {
    clientData: {
      signedByStr,
      shortHash,
      rawHash,
    }
  } = operation;

  const OpClass = useFormatting(operation);

  const title = OpClass.getOpDescription(operation);
  const icon = OpClass.getIcon();
  const link = `/data/transaction/${rawHash}`;

  let content;
  let objects = [];
  if (Array.isArray(operation.new)) {
    objects = objects.concat(operation.new);
  }
  if (Array.isArray(operation.old)) {
    objects = objects.concat(operation.old);
  }
  if (Array.isArray(operation.edit)) {
    objects = objects.concat(operation.edit);
  }

  if (objects.length === 1) {
    const object = objects[0];
    content = <React.Fragment>
      <p>Object type: <strong>{OpClass.getName()}</strong></p>
      <p>{OpClass.getObjDescription(object)}</p>
    </React.Fragment>;
  }

  return <DataListItem
      block={operation}
      title={title}
      icon={icon}
      link={link}
      signedBy={signedByStr}
      shortId={shortHash}
  >
    {content}
    <ObjectsSummary op={operation} listItem={true}/>
  </DataListItem>;
};
